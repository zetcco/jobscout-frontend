import { serverClient } from "./authSlice";
import { sendSignal } from "./websocketSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const peerConnections = {}
const subscriptions = []

const initialState = {
    meetingInfo: null,
    remoteVideos: {
        videos: {},
        ids: []
    },
    localStream: {
        audio: '',
        video: ''
    },
    connected: false,
    isMicMuted: false,
    isCameraMuted: false,
    mediaDevices: {},
    loading: false,
    error: null
}

export const selectMeetingPeerConnections = (state) => state.meet.peerConnections;
export const selectMeetingInfo = (state) => state.meet.meetingInfo;
export const selectMeetingRemoteVideos = (state) => state.meet.remoteVideos;
export const selectMeetingMediaDevices = (state) => state.meet.mediaDevices;
export const selectMeetingLocalStream = (state) => state.meet.localStream;
export const selectMeetingError = (state) => state.meet.error;
export const selectMeetingLoading = (state) => state.meet.loading;
export const selectMeetingMicMute = (state) => state.meet.isMicMuted
export const selectMeetingCameraMute = (state) => state.meet.isCameraMuted
export const selectMeetingConnected = (state) => state.meet.connected

const meetSlice = createSlice({
    name: 'meet',
    initialState,
    reducers: {
        setLocalStream: (state, action) => {
            state.localStream = {...state.localStream, ...action.payload}
        },
        addRemoteVideo: (state, action) => {
            if (!(action.payload.peer in state.remoteVideos.videos)) {
                state.remoteVideos.videos[action.payload.peer] = action.payload
                state.remoteVideos.ids = [ ...state.remoteVideos.ids, action.payload.peer ]
            } else if (action.payload.peer === 'local') {
                state.remoteVideos.videos[action.payload.peer].stream.getTracks().forEach( track => { track.stop() } )
                state.remoteVideos.videos[action.payload.peer] = action.payload
                const tracks = action.payload.stream.getTracks()
                Object.values(peerConnections).forEach( peerConnection => {
                    const senders = peerConnection.connection.getSenders()
                    senders.forEach(sender => {
                        tracks.forEach(track => {
                            if (sender.track.kind === track.kind)
                                sender.replaceTrack(track)
                        });
                    });
                })
            }
        },
        removeRemoteVideo: (state, action) => {
            state.remoteVideos.videos[action.payload].stream.getTracks().forEach( track => { track.stop() } )
            delete state.remoteVideos.videos[action.payload]
            state.remoteVideos.ids = state.remoteVideos.ids.filter( id => id !== action.payload )
        },
        toggleMicMuteState: (state, action) => {
            state.isMicMuted = !state.isMicMuted
        },
        toggleCameraMuteState: (state, action) => {
            state.isCameraMuted = !state.isCameraMuted
        },
        setMeetingConnected: (state, action) => {
            state.connected = action.payload
        },
        clearMeetingInfo: (state, action) => {
            Object.keys(state).forEach(key => {
                state[key] = initialState[key]
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMeeting.fulfilled, (state, action) => {
                state.meetingInfo = action.payload
                state.loading = false
            })
            .addCase(fetchMeeting.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(fetchMeeting.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchMediaDevices.fulfilled, (state, action) => {
                state.mediaDevices = action.payload
            })
    }
})

export default meetSlice.reducer;
export const { 
    setLocalStream,
    addRemoteVideo,
    removeRemoteVideo,
    toggleMicMuteState,
    toggleCameraMuteState,
    setMeetingConnected,
    clearMeetingInfo
} = meetSlice.actions;

export const fetchMeeting = createAsyncThunk('meet/fetchMeeting', async ({ link }, { rejectWithValue }) => {
    try {
        const response = await serverClient.get(`/meeting/${link}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchMediaDevices = createAsyncThunk('meet/fetchMediaDevices', async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = { devices: {}, ids: [] }
    const videoDevices = { devices: {}, ids: [] }
    devices.forEach(device => {
        if (device.kind === 'videoinput' && !(device.deviceId in videoDevices.devices)) {
            videoDevices.devices[device.deviceId] = device
            videoDevices.ids.push(device.deviceId)
        }
        else if (device.kind === 'audioinput' && !(device.deviceId in audioDevices.devices)) {
            audioDevices.devices[device.deviceId] = device
            audioDevices.ids.push(device.deviceId)
        }
    });
    return { videoDevices, audioDevices }
})

export const joinMeeting = createAsyncThunk('meet/joinMeeting', async (_, { getState, dispatch }) => {

    const state = getState()

    // const stream = state.meet.remoteVideos.videos['local'].stream
    // const stream = await getLocalStreamMedia(state.meet.localStream)
    // stream.getVideoTracks()[0].enabled = !state.meet.isCameraMuted
    // stream.getAudioTracks()[0].enabled = !state.meet.isMicMuted

    // dispatch(addRemoteVideo({ peer: 'local', stream }))

    dispatch(subscribeToMeeting())
    dispatch(sendSignalToMeeting({ content: `User(id: ${state.auth.userInfo.id}) Joined` }, "MEETING_JOIN"))
    dispatch(setMeetingConnected(true))

})

export const setLocalPlaybackStream = createAsyncThunk('meet/setLocalPlaybackStream', async (selectedStream, { getState, dispatch }) => {
    const state = getState()

    dispatch(setLocalStream(selectedStream))
    const selectedStreamCombination = {...state.meet.localStream, ...selectedStream}
    const stream = await getLocalStreamMedia(selectedStreamCombination)
    dispatch(addRemoteVideo({ peer: 'local', stream }))
})

export const toggleMicMute = () => (dispatch, getState) => {
    const state = getState()
    state.meet.remoteVideos.videos['local'].stream.getAudioTracks()[0].enabled = !(state.meet.remoteVideos.videos['local'].stream.getAudioTracks()[0].enabled)
    dispatch(toggleMicMuteState())
}

export const toggleCameraMute = () => (dispatch, getState) => {
    const state = getState()
    state.meet.remoteVideos.videos['local'].stream.getVideoTracks()[0].enabled = !(state.meet.remoteVideos.videos['local'].stream.getVideoTracks()[0].enabled)
    dispatch(toggleCameraMuteState())
}

const onCandidateJoin = createAsyncThunk('meet/onCandidateJoin', async ( senderId, { getState, dispatch } ) => {

    const state = getState()

    if (senderId in peerConnections) 
        return

    const peerConnection = getNewPeerConnection(
        senderId,
        (stream) => { dispatch(addRemoteVideo(stream)) },
        (ice_candidate) => { dispatch(sendSignalToMeeting(ice_candidate, "MEETING_ICE_CANDIDATE")) },
        (peerId) => { dispatch(onUserLeave(peerId)) }
    )
    addPeerConnection(peerConnection)

    const localStream = state.meet.remoteVideos.videos['local'].stream

    localStream.getTracks().forEach(track => {
        peerConnection.connection.addTrack(track, localStream)
    })

    const offer = peerConnection.connection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })

    await peerConnection.connection.setLocalDescription(offer)

    dispatch(sendSignalToMeeting(peerConnection.connection.localDescription.toJSON(), "MEETING_OFFER", senderId))

})

const onOfferRecieved = createAsyncThunk('meet/onOfferRecieved', async ({ senderId, sessionDescription }, { getState, dispatch }) => {

    const state = getState()

    if (senderId in peerConnections) 
        return

    const peerConnection = getNewPeerConnection(
        senderId,
        (stream) => { dispatch(addRemoteVideo(stream)) },
        (ice_candidate) => { dispatch(sendSignalToMeeting(ice_candidate, "MEETING_ICE_CANDIDATE")) },
        (peerId) => { dispatch(onUserLeave(peerId)) }
    )
    addPeerConnection(peerConnection)

    await peerConnection.connection.setRemoteDescription(sessionDescription)

    const localStream = state.meet.remoteVideos.videos['local'].stream

    localStream.getTracks().forEach(track => {
        peerConnection.connection.addTrack(track, localStream)
    })
    
    const answer = peerConnection.connection.createAnswer()

    await peerConnection.connection.setLocalDescription(answer)

    dispatch(sendSignalToMeeting(peerConnection.connection.localDescription.toJSON(), "MEETING_ANSWER", senderId))

})

const onIceCandidateRecieved = (senderId, iceCandidate) => {
    const peerConnection = getPeerConnection(senderId)
    peerConnection.connection.addIceCandidate(iceCandidate)
}

const acceptAnswer = (senderId, sessionDescription) => {
    const peerConnection = getPeerConnection(senderId)
    peerConnection.connection.setRemoteDescription(sessionDescription)
}

const onUserLeave = (senderId) => (dispatch) => {
    if (senderId in peerConnections) {
        removePeerConnection(senderId) 
        dispatch(removeRemoteVideo(senderId))
    }
}

export const leaveMeeting = () => (dispatch, getState) => {
    const state = getState()

    dispatch(sendSignalToMeeting({ content: `User(id: ${state.auth.userInfo.id}) Leaved` }, "MEETING_LEFT"))

    closePeerConnections()

    Object.values(state.meet.remoteVideos.videos).forEach( (video) => {
        if (video.peer !== 'local')
            dispatch(removeRemoteVideo(video.peer))
    })

    unsubscribeFromMeeting()
    dispatch(setMeetingConnected(false))
}

export const leaveFromJoin = () => (dispatch, getState) => {
    const state = getState()
    Object.values(state.meet.remoteVideos.videos).forEach( (video) => {
        dispatch(removeRemoteVideo(video.peer))
    })
    dispatch(clearMeetingInfo())
}

const meetingSignalingResolver = (payload) => (dispatch, getState) => {
    const state = getState()
    payload = JSON.parse(payload.body)
    let { data, senderId, type } = payload
    if (state.auth.userInfo.id !== senderId) {
        data = JSON.parse(data)
        switch (type) {
            case "MEETING_ICE_CANDIDATE":
                onIceCandidateRecieved(senderId, new RTCIceCandidate(data))
                break;
            case "MEETING_OFFER":
                dispatch(onOfferRecieved({ senderId, sessionDescription: new RTCSessionDescription(data) }))
                break;
            case "MEETING_ANSWER":
                acceptAnswer(senderId, new RTCSessionDescription(data))
                break;
            case "MEETING_JOIN":
                dispatch(onCandidateJoin(senderId))
                break;
            case "MEETING_LEFT":
                dispatch(onUserLeave(senderId))
                break;
            case "MEETING_END":
                break;
            default:
                break;
        }
    }
}

const getLocalStreamMedia = async (localStream) => {
    try {
        const constraint = {
            video: { deviceId: { exact: localStream.video.deviceId } },
            audio: { deviceId: { exact: localStream.audio.deviceId } }
        }
        return await navigator.mediaDevices.getUserMedia(constraint)
    } catch (error) {
        console.error(error)
    }
}

const subscribeToMeeting = () => (dispatch, getState) => {
    const state = getState()
    let subscription = state.websocket.stompClient.subscribe(
        `/meeting/${state.meet.meetingInfo.link}`,
        (payload) => { dispatch(meetingSignalingResolver(payload)) },
        {"token": state.auth.token}
    )
    subscriptions.push(subscription)
    subscription = state.websocket.stompClient.subscribe(
        `/meeting/${state.meet.meetingInfo.link}/${state.auth.userInfo.id}`,
        (payload) => { dispatch(meetingSignalingResolver(payload)) },
        {"token": state.auth.token}
    )
    subscriptions.push(subscription)
}

const unsubscribeFromMeeting = () => {
    subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
}

const sendSignalToMeeting = (data, type, to = undefined) => (dispatch, getState) => {
    const state = getState()
    dispatch(sendSignal(
        `/meeting/${state.meet.meetingInfo.link}${to ? "/" + to : ""}`,
        type, 
        data
    ))
}

const getNewPeerConnection = (senderId, onTrack, onIceCandidate, onDisconnect) => {

    const newRTCPeerConnection = new RTCPeerConnection();
    
    newRTCPeerConnection.ontrack = (event) => {
        const peerStream = { peer: senderId, stream: event.streams[0] };
        onTrack(peerStream)
    }

    newRTCPeerConnection.onicecandidate = async (event) => {
        if (event.candidate) 
            onIceCandidate(event.candidate)
    }

    newRTCPeerConnection.onconnectionstatechange = (event) => {
        switch (newRTCPeerConnection.connectionState) {
            case "disconnected":
                onDisconnect(senderId)
                break;
            default:
                break;
        }
    }

    const newConnection = { peer: senderId, connection: newRTCPeerConnection }
    return newConnection;
}

const addPeerConnection = (connection) => {
    peerConnections[connection.peer] = connection
}

const removePeerConnection = (peerId) => {
    peerConnections[peerId].connection.close()
    peerConnections[peerId] = null
    delete peerConnections[peerId]
}

const getPeerConnection = (peerId) => {
    return peerConnections[peerId]
}

const closePeerConnections = () => {
    Object.keys(peerConnections).forEach( (peerId) => {
        removePeerConnection(peerId)
    })
}