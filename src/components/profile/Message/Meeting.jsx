import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { Video } from "components/Video";
import { selectAuthUser, selectAuthUserToken } from "features/authSlice";
import { selectWebSocketStompClient } from "features/websocketSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// const rtcPeerConnection = new RTCPeerConnection()
let peerConnections = []
export const Meeting = () => {

    const { link } = useParams()
    const navigate = useNavigate()
    const [ meetingData, setMeetingData ] = useState('');
    const authToken = useSelector(selectAuthUserToken)

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axios.get(`/meeting/${link}`, { headers: { Authorization: `Bearer ${authToken}` } });
                setMeetingData(response.data)
            } catch (error) {
                navigate('/home')
            }
        }

        fetchMeeting()
    }, [])

    const stompClient = useSelector(selectWebSocketStompClient)
    const user = useSelector(selectAuthUser)

    const [ remoteVideos, setRemoteVideos ] = useState([])

    const [ localStream, setLocalStream ] = useState({
        audio: '',
        video: ''
    });
    const [ videoDevices, setVideoDevices ] = useState([]);
    const [ audioDevices, setAudioDevices ] = useState([]);

    // Set all the available devices on page load
    useEffect(() => {
        const getMediaDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            devices.forEach(device => {
                if (device.kind === 'videoinput')
                    setVideoDevices((prevSate) => prevSate.some(({ deviceId }) => deviceId === device.deviceId) ? prevSate : [...prevSate, device])
                else if (device.kind === 'audioinput')
                    setAudioDevices((prevSate) => prevSate.some(({ deviceId }) => deviceId === device.deviceId) ? prevSate : [...prevSate, device])
            });
        } 
        getMediaDevices()
    }, [])

    const onCandidateLeave = (senderId) => {
        console.log(remoteVideos)
        // const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection
        // rtcPeerConnection.close()
    }

    // Fires when a ICE_CANDIDATE signal has been recived by the newly joined user (this fires after OFFER and ICE_CANDIDATE signals are sent by existing user)
    const onIceCandidate = (data, senderId) => {
        // Get the RTCPeerConnection object for the newly joined user (which was created when JOIN signal recivied)
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection
        rtcPeerConnection.addIceCandidate(data)
    }

    // Fires when existing user gets a ANSWER signal from the newly joined user
    const onAnswerAccept = (data, senderId) => {
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection

        rtcPeerConnection.setRemoteDescription(data) // Which fires the 'ontrack' callback which was set when the new RTCPeerConnection object was created
    }

    // Fires when newly joined user recieves OFFER signal from existing user
    const onOffer = async (data, senderId) => {

        // Create a new RTCPeerConnection object for the existing user
        const rtcPeerConnection = getNewPeerConnection(senderId).connection;

        // Set Remote Description of the newly created RTCPeerConnection object (which the existing user sent)
        await rtcPeerConnection.setRemoteDescription(data)

        // Get the local stream of newly joined user 
        const stream = await getLocalStream()

        // Set the local stream of newly joined user to the newly created RTCPeerConnection object (which was created for the existing user)
        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        // Create an ANSWER signal accepting the existing user's OFFER
        const answer = rtcPeerConnection.createAnswer()
        
        // Set that ANSWER as the local description of the newly joined user (which fires 'onicecandidate' event (which sends newly joined user's ICE objects))
        await rtcPeerConnection.setLocalDescription(answer)
        
        // Send that ANSWER to the existing user (which will fire his 'onAnswer' which fires his 'ontrack' event)
        sendMessage(rtcPeerConnection.localDescription.toJSON(), "ANSWER", senderId)
    }

    // Fires when 'Join' button is clicked
    const joinMeeting = async () => {
        const stream = await getLocalStream() // Get the local stream
        console.log(stream.getAudioTracks())
        stream.getAudioTracks()[0].enabled = false // Mute the local stream audio (so it won't hear back)
        setRemoteVideos((prevSate) => [...prevSate, { peer: 'local', stream }]) // Add the stream to video element

        subscribe(meetingData.link) // Subscribe to the video chat room signaling channel
        subscribe(meetingData.link, user.id) // Subsribe to the video chat room private signaling channel

        sendMessage({ content: `User(id: ${user.id}) Joined` }, "JOIN") // Finally send to everyone that you have joined the chat room
    }

    const leaveMeeting = () => {
        peerConnections.forEach(peer => { peer.connection.close() });
        remoteVideos.forEach(video => { video.stream.getTracks().forEach(track => { track.stop() }) })
        setRemoteVideos([])
        unsubscribe(meetingData.link) 
        unsubscribe(meetingData.link, user.id) 
    }

    // Fires when a JOIN signal have been recived by a new user
    const onCandidateJoin = async (data) => {
        const rtcPeerConnection = getNewPeerConnection(data.senderId).connection // Create a new RTCPeerConnection object for the new user

        // const stream = await setLocalStreamVideo()
        const stream = await getLocalStream() // Get the local stream  (IMPROVE THIS TO GET STREAM FROM CURRENT LOCAL STREAM VIDEO ELEMENT)

        // Add the tracks (video and audio) to the new RTCPeerConnection
        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        // Create a new Offer to share your stream with newly joined user
        let offer = rtcPeerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
        await rtcPeerConnection.setLocalDescription(offer) // Set the offer object as Local description (which fires 'onicecandidate' function, which will send ICE_CANDIDATE signal for the newly joined user)

        // Send the created offer to the newly joined user
        sendMessage(rtcPeerConnection.localDescription.toJSON(), "OFFER", data.senderId)
    }

    const sendMessage = (data, type, to = null) => {
        stompClient.send(`/room/${meetingData.link}${to ? "/" + to : ""}`, {}, JSON.stringify({
            senderId: user.id,
            type,
            data: JSON.stringify(data)
        }))
    }

    const subscribe = (meetindId, userId = null) => {
        stompClient.subscribe(
            `/room/${meetingData.link}${userId ? "/" + userId : ""}`,
            (payload) => {
                payload = JSON.parse(payload.body)
                if (payload.senderId !== user.id)
                    rtcSignalResolver(payload, resolverFunctions) // Pass the recived signal to the Signal Resolver
            },
            {"token": authToken}
        );
    }

    const unsubscribe = (meetindId, userId = null) => {
        stompClient.unsubscribe(
            `/room/${meetingData.link}${userId ? "/" + userId : ""}`,
            (payload) => {
                payload = JSON.parse(payload.body)
                if (payload.senderId !== user.id)
                    rtcSignalResolver(payload, resolverFunctions) // Pass the recived signal to the Signal Resolver
            },
            {"token": authToken}
        );
    }

    const getLocalStream = async () => {
        console.log(localStream)
        const constraint = {
            video: { deviceId: { exact: localStream.video.deviceId } },
            audio: { deviceId: { exact: localStream.audio.deviceId } }
        }
        console.log(constraint)
        return await navigator.mediaDevices.getUserMedia(constraint)
    }

    const getNewPeerConnection = (senderId = null) => {

        const newRTCPeerConnection = new RTCPeerConnection();
        
        // Fires when the 'Remote description' is set for the newly created RTCPeerConnection object
        newRTCPeerConnection.ontrack = (event) => {
            // Add the recived stream to the existing stream objects (which includes local stream and streams of existing users, if there's any)
            setRemoteVideos(
                (prevSate) => {
                    const peerStream = { peer: senderId, stream: event.streams[0] };
                    if (!prevSate.some( ({ peer }) => peer === senderId ))
                        return ([...prevSate, peerStream])
                    else
                        return prevSate
                }
            )
        }

        // Fires when the 'Local description' is set for the newly created RTCPeerConnection object
        newRTCPeerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                // Send ICE_CANDIDATE signal when local description is set
                sendMessage(event.candidate, "ICE_CANDIDATE", senderId)
            }
        }

        newRTCPeerConnection.onconnectionstatechange = (event) => {
            switch (newRTCPeerConnection.connectionState) {
                case "disconnected":
                    setRemoteVideos( (prevState) => prevState.filter( (stream) => stream.peer !== senderId ) )
                    break;
                default:
                    break;
            }
        }

        const newConnection = { peer: senderId, connection: newRTCPeerConnection }
        peerConnections = [ ...peerConnections, newConnection ]
        return newConnection;
    }

    const resolverFunctions = {
        iceCandidate: onIceCandidate, 
        offer: onOffer,
        answer: onAnswerAccept,
        join: onCandidateJoin,
        leave: onCandidateLeave
    }

    return (
        <Stack alignItems="center" direction="column" spacing={2}>
            <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="video-selector-label">Select Video</InputLabel>
                    <Select label="Select Video" labelId="video-selector-label" value={localStream.video} onChange={ (e) => setLocalStream((prevState) =>  ({ ...prevState, video: e.target.value })) }>
                        {
                            videoDevices.map((device, index) => (
                                <MenuItem key={index} value={device}>{device.label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="audio-selector-label">Select Audio</InputLabel>
                    <Select label="Select Audio" labelId="audio-selector-label" value={localStream.audio} onChange={ (e) => setLocalStream((prevState) =>  ({ ...prevState, audio: e.target.value })) }>
                        {
                            audioDevices.map((device, index) => (
                                <MenuItem key={index} value={device}>{device.label}</MenuItem>
                            ))
                        } 
                    </Select>
                </FormControl>
                <Button onClick={joinMeeting} variant='contained' disabled={meetingData === ''}>Join</Button>
                <Button onClick={leaveMeeting} variant='contained' disabled={remoteVideos.length === 0}>Disconnect</Button>
                { user.id === meetingData.hoster?.id && (<Button onClick={joinMeeting} variant='contained' disabled={remoteVideos.length === 0}>End</Button>) }
            </Stack>
            <Grid container>
                {
                    remoteVideos.map((peerStream, index) => (
                        <Grid item xs={ remoteVideos.length === 1 ? 12 : 6} md={remoteVideos.length === 1 ? 12 : 4} key={index}>
                            <Video srcObject={peerStream.stream}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>
    )
};

const rtcSignalResolver = (signal, actions) => {
    let { senderId, type, data } = signal
    const { iceCandidate, offer, answer, join, leave } = actions

    data = JSON.parse(data)

    switch (type) {
        case "ICE_CANDIDATE":
            iceCandidate(new RTCIceCandidate(data), senderId)
            break;
        case "OFFER":
            offer(new RTCSessionDescription(data), senderId)
            break;
        case "ANSWER":
            answer(new RTCSessionDescription(data), senderId)
            break;
        case "LEAVE":
            leave(senderId)
            break;
        case "JOIN":
            join({ senderId, data })
            break;
        default:
            break;
    }
}