import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Video } from "components/Video";
import { selectAuthUser, selectAuthUserToken } from "features/authSlice";
import { selectWebSocketStompClient } from "features/websocketSlice";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// const rtcPeerConnection = new RTCPeerConnection()
let peerConnections = []
export const Meeting = () => {

    const stompClient = useSelector(selectWebSocketStompClient)
    const authToken = useSelector(selectAuthUserToken)
    const user = useSelector(selectAuthUser)

    const [ remoteVideos, setRemoteVideos ] = useState([])

    const [ meetingId, setMeetingId ] = useState('');

    const [ localStream, setLocalStream ] = useState('');
    const [ devices, setDevices ] = useState([]);

    // Set all the available devices on page load
    useEffect(() => {
        const getMediaDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            setDevices(devices)
        } 
        getMediaDevices()
    }, [])

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
        stream.getAudioTracks()[0].enabled = false // Mute the local stream audio (so it won't hear back)
        setRemoteVideos((prevSate) => [...prevSate, stream]) // Add the stream to video element

        subscribe(meetingId) // Subscribe to the video chat room signaling channel
        subscribe(meetingId, user.id) // Subsribe to the video chat room private signaling channel

        sendMessage({ content: `User(id: ${user.id}) Joined` }, "JOIN") // Finally send to everyone that you have joined the chat room
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
        stompClient.send(`/room/${meetingId}${to ? "/" + to : ""}`, {}, JSON.stringify({
            senderId: user.id,
            type,
            data: JSON.stringify(data)
        }))
    }

    const subscribe = (meetindId, userId = null) => {
        stompClient.subscribe(
            `/room/${meetingId}${userId ? "/" + userId : ""}`,
            (payload) => {
                payload = JSON.parse(payload.body)
                if (payload.senderId !== user.id)
                    rtcSignalResolver(payload, resolverFunctions) // Pass the recived signal to the Signal Resolver
            },
            {"token": authToken}
        );
    }

    const getLocalStream = async () => {
        const constraint = {
            video: { deviceId: { exact: localStream.deviceId } },
            audio: true
        }
        return await navigator.mediaDevices.getUserMedia(constraint)
    }

    const getNewPeerConnection = (senderId = null) => {

        const newRTCPeerConnection = new RTCPeerConnection();
        
        // Fires when the 'Remote description' is set for the newly created RTCPeerConnection object
        newRTCPeerConnection.ontrack = (event) => {
            
            // Add the recived stream to the existing stream objects (which includes local stream and streams of existing users, if there's any)
            setRemoteVideos(
                (prevSate) => {
                    if (!prevSate.includes(event.streams[0]))
                        return ([...prevSate, event.streams[0]])
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

        newRTCPeerConnection.oniceconnectionstatechange = (event) => {
            switch (newRTCPeerConnection.connectionState) {
                case "disconnected":
                    console.warn(`${senderId} disconnected`)
                    break;
                default:
                    console.warn(`${senderId} - Unknown`)
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
        join: onCandidateJoin
    }

    return (
        <>
            <Select value={localStream} onChange={ (e) => setLocalStream(e.target.value) }>
                {
                    devices.map((device, index) => (
                        <MenuItem key={index} value={device}>{device.label}</MenuItem>
                    ))
                } 
            </Select>
            <TextField value={meetingId} onChange={(e) => setMeetingId(e.target.value)}/>
            <Button onClick={joinMeeting} variant='contained' disabled={localStream === ''}>Join</Button>
            <Grid container>
                {
                    remoteVideos.map((stream, index) => (
                        <Grid item xs={6} md={4}>
                            <Video srcObject={stream} key={index}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
};

const rtcSignalResolver = (signal, actions) => {
    let { senderId, type, data } = signal
    const { iceCandidate, offer, answer, join } = actions

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
        case "JOIN":
            join({ senderId, data })
            break;
        default:
            break;
    }
}