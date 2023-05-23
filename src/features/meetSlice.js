import { serverClient } from "./authSlice";
import { sendSignal } from "./websocketSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const peerConnections = {}
const subscriptions = []

const initialState = {
    meetingInfo: null,
    remoteVideos: {
        videos: {},
        ids: [],
        screenShare: {}
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
export const selectMeetingIsLocalScreenShared = (state) => state.meet.remoteVideos.videos.local && 'screen' in state.meet.remoteVideos.videos.local;
export const selectMeetingCanShareScreen = (state) => Object.keys(state.meet.remoteVideos.screenShare).length === 0;

const meetSlice = createSlice({
    name: 'meet',
    initialState,
    reducers: {
        setLocalStream: (state, action) => {
            state.localStream = {...state.localStream, ...action.payload}
        },
        addRemoteVideo: (state, action) => {
            if (action.payload.peer === 'local') {

                if (!(action.payload.peer in state.remoteVideos.videos))
                    state.remoteVideos.ids = [ ...state.remoteVideos.ids, action.payload.peer ]

                // Called when the user changes the camera stream
                if (state.remoteVideos.videos.local && action.payload.key === 'localStream' && action.payload.key in state.remoteVideos.videos.local) {
                    state.remoteVideos.videos.local[action.payload.key].getTracks().forEach( track => { track.stop() } )
                    
                    // Add newly selected tracks to the existing track of each peerConnection
                    const stream = action.payload.stream
                    const tracks = stream.getTracks()

                    if (stream.getAudioTracks().length !== 0)
                        stream.getAudioTracks()[0].enabled = state.isMicMuted
                    if (stream.getVideoTracks().length !== 0)
                        stream.getVideoTracks()[0].enabled = state.isCameraMuted

                    Object.values(peerConnections).forEach( peerConnection => {
                        const senders = peerConnection.connection.getSenders()
                        senders.forEach(sender => {
                            tracks.forEach(track => {
                                if (sender.track?.kind === track.kind)
                                    sender.replaceTrack(track)
                            });
                        });
                    })
                } 

                state.remoteVideos.videos['local'] = { ...state.remoteVideos.videos['local'], [action.payload.key]: action.payload.stream }
            } 
            else {
                if (!(action.payload.peer in state.remoteVideos.videos))
                    state.remoteVideos.ids = [ ...state.remoteVideos.ids, action.payload.peer ]

                state.remoteVideos.videos[action.payload.peer] = { ...state.remoteVideos.videos[action.payload.peer], [action.payload.stream.id]: action.payload.stream }
            }
        },
        removeRemoteVideo: (state, action) => {
            Object.values(state.remoteVideos.videos[action.payload]).forEach(stream => {
                stream.getTracks().forEach( track => { track.stop() } )
            })
            delete state.remoteVideos.videos[action.payload]
            state.remoteVideos.ids = state.remoteVideos.ids.filter( id => id !== action.payload )
        },
        clearScreenShareLocalStream: (state, action) => {
            state.remoteVideos.videos.local.screen.getTracks().forEach( track => { track.stop() } )
            delete state.remoteVideos.videos.local.screen
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
        },
        addScreenShareInfo: (state, action) => {
            state.remoteVideos.screenShare = action.payload
        },
        removeScreenShareInfo: (state, action) => {
            if (state.remoteVideos.screenShare.peer === action.payload.peer && state.remoteVideos.screenShare.streamId === action.payload.streamId) {
                state.remoteVideos.screenShare = {}
                state.remoteVideos.videos[action.payload.peer][action.payload.streamId].getTracks().forEach( track => { track.stop() } )
                delete state.remoteVideos.videos[action.payload.peer][action.payload.streamId]
            }
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
    clearMeetingInfo,
    addScreenShareInfo,
    removeScreenShareInfo,
    clearScreenShareLocalStream
} = meetSlice.actions;

export const fetchMeeting = createAsyncThunk('meet/fetchMeeting', async ({ link }, { rejectWithValue }) => {
    try {
        const response = await serverClient.get(`/meeting/${link}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const endMeeting = createAsyncThunk('meet/endMeeting', async ({ link }, { dispatch, rejectWithValue }) => {
    try {
        const response = await serverClient.delete(`/meeting/${link}`)
        console.log(response);
        if (response.status === 200) {
            dispatch(sendSignalToMeeting({}, "MEETING_END"))
            dispatch(leaveFromJoin())
        }
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
    dispatch(subscribeToMeeting())
    dispatch(sendSignalToMeeting({ content: `User(id: ${state.auth.userInfo.id}) Joined` }, "MEETING_JOIN"))
    dispatch(setMeetingConnected(true))

})

export const setLocalPlaybackStream = createAsyncThunk('meet/setLocalPlaybackStream', async (selectedStream, { getState, dispatch }) => {
    const state = getState()

    dispatch(setLocalStream(selectedStream))
    const selectedStreamCombination = {...state.meet.localStream, ...selectedStream}
    const stream = await getLocalStreamMedia(selectedStreamCombination)
    dispatch(addRemoteVideo({ peer: 'local', stream, key: 'localStream' } ))
})

export const toggleMicMute = () => (dispatch, getState) => {
    const state = getState()
    state.meet.remoteVideos.videos.local.localStream.getAudioTracks()[0].enabled = !(state.meet.remoteVideos.videos.local.localStream.getAudioTracks()[0].enabled)
    dispatch(toggleMicMuteState())
}

export const toggleCameraMute = () => (dispatch, getState) => {
    const state = getState()
    state.meet.remoteVideos.videos.local.localStream.getVideoTracks()[0].enabled = !(state.meet.remoteVideos.videos.local.localStream.getVideoTracks()[0].enabled)
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
        (peerId) => { dispatch(onUserLeave(peerId)) },
        (localDescription) => { dispatch(sendSignalToMeeting(localDescription, "MEETING_RENEGOTIATE", senderId)) }
    )
    addPeerConnection(peerConnection)

    const localStream = state.meet.remoteVideos.videos.local.localStream

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
        (peerId) => { dispatch(onUserLeave(peerId)) },
        (localDescription) => { dispatch(sendSignalToMeeting(localDescription, "MEETING_RENEGOTIATE", senderId)) }
    )
    addPeerConnection(peerConnection)

    await peerConnection.connection.setRemoteDescription(sessionDescription)

    const localStream = state.meet.remoteVideos.videos.local.localStream

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

const onRenegotiate = createAsyncThunk('meet/onRenegotiate', async ({ senderId, sessionDescription }, { getState, dispatch }) => {
    const peerConnection = getPeerConnection(senderId)
    await peerConnection.connection.setRemoteDescription(sessionDescription)
    await peerConnection.connection.setLocalDescription(peerConnection.connection.createAnswer())
    dispatch(sendSignalToMeeting(peerConnection.connection.localDescription.toJSON(), "MEETING_ANSWER", senderId))
})

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

    Object.values(state.meet.remoteVideos.ids).forEach( (id) => {
        if (id !== 'local')
            dispatch(removeRemoteVideo(id))
    })

    unsubscribeFromMeeting()
    dispatch(setMeetingConnected(false))
}

export const leaveFromJoin = () => (dispatch, getState) => {
    const state = getState()
    Object.keys(state.meet.remoteVideos.videos).forEach((peer) => {
        dispatch(removeRemoteVideo(peer))
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
            case "MEETING_RENEGOTIATE":
                dispatch(onRenegotiate({ senderId, sessionDescription: new RTCSessionDescription(data) }))
                break;
            case "MEETING_SCREENSHARE_START":
                dispatch(addScreenShareInfo({ peer: senderId, ...data }))
                break;
            case "MEETING_SCREENSHARE_STOP":
                dispatch(removeScreenShareInfo({ peer: senderId, ...data }))
                break;
            case "MEETING_END":
                dispatch(leaveFromJoin())
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

export const toggleScreenShare = () => (dispatch, getState) => {
    const state = getState()
    if ( 'screen' in state.meet.remoteVideos.videos.local) {
        dispatch(stopScreenShare())
    } else {
        dispatch(startScreenShare())
    }
}

export const startScreenShare = createAsyncThunk('meet/getScreenShare', async (_, { getState, dispatch }) => {
    
    const stream = await navigator.mediaDevices.getDisplayMedia()

    dispatch(addRemoteVideo({ peer: 'local', stream, key: 'screen' } ))

    stream.getTracks().forEach(track => {
        track.onended = () => {
            dispatch(stopScreenShare())
        }
    })

    dispatch(sendSignalToMeeting({ streamId: stream.id }, "MEETING_SCREENSHARE_START"))

    Object.values(peerConnections).forEach( peerConnection => {
        stream.getTracks().forEach(track => {
            peerConnection.connection.addTrack(track, stream)
        })
    })

})

export const stopScreenShare = () => (dispatch, getState) => {
    const state = getState()
    const screen_tracks = state.meet.remoteVideos.videos.local.screen.getTracks()
    Object.values(peerConnections).forEach( peerConnection => {
        peerConnection.connection.getSenders().forEach( sender => {
            screen_tracks.forEach( track => {
                if (track.id === sender.track?.id) {
                    track.stop()
                    peerConnection.connection.removeTrack(sender)
                }
            } )
        })
    })
    dispatch(sendSignalToMeeting({ streamId: state.meet.remoteVideos.videos.local.screen.id }, "MEETING_SCREENSHARE_STOP"))
    dispatch(clearScreenShareLocalStream())
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

const getNewPeerConnection = (senderId, onTrack, onIceCandidate, onDisconnect, sendSignalOnNegotiate) => {

    const newRTCPeerConnection = new RTCPeerConnection();
    
    newRTCPeerConnection.ontrack = (event) => {
        const peerStream = { peer: senderId, stream: event.streams[0] };
        onTrack(peerStream)
    }

    newRTCPeerConnection.onicecandidate = async (event) => {
        if (event.candidate) 
            onIceCandidate(event.candidate)
    }

    newRTCPeerConnection.onnegotiationneeded = async () => {
        await newRTCPeerConnection.setLocalDescription(await newRTCPeerConnection.createOffer())
        sendSignalOnNegotiate(newRTCPeerConnection.localDescription.toJSON())
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