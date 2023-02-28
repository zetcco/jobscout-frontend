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

    const localVideo = useRef(null);

    const [ remoteVideos, setRemoteVideos ] = useState([])

    const [ meetingId, setMeetingId ] = useState('');

    const [ localStream, setLocalStream ] = useState('');
    const [ devices, setDevices ] = useState([]);

    useEffect(() => {
        const getMediaDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            setDevices(devices)
        } 
        getMediaDevices()
    }, [])

    const onIceCandidate = (data, senderId) => {
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection
        rtcPeerConnection.addIceCandidate(data)
    }

    const onAnswerAccept = (data, senderId) => {
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection

        rtcPeerConnection.setRemoteDescription(data)
    }

    const onOffer = async (data, senderId) => {

        const rtcPeerConnection = getNewPeerConnection(senderId).connection;

        await rtcPeerConnection.setRemoteDescription(data)

        // const stream = await setLocalStreamVideo()
        const stream = await getLocalStream()

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        const answer = rtcPeerConnection.createAnswer()
        await rtcPeerConnection.setLocalDescription(answer)
        
        sendMessage(rtcPeerConnection.localDescription.toJSON(), "ANSWER", senderId)
    }

    const joinMeeting = async () => {
        // await setLocalStreamVideo()
        const stream = await getLocalStream()
        stream.getAudioTracks()[0].enabled = false
        setRemoteVideos((prevSate) => [...prevSate, stream])

        subscribe(meetingId)
        subscribe(meetingId, user.id)

        sendMessage({ content: `User(id: ${user.id}) Joined` }, "JOIN")
    }

    const onCandidateJoin = async (data) => {
        const rtcPeerConnection = getNewPeerConnection(data.senderId).connection

        // const stream = await setLocalStreamVideo()
        const stream = await getLocalStream()

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        let offer = rtcPeerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
        await rtcPeerConnection.setLocalDescription(offer)

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
                    rtcSignalResolver(payload, resolverFunctions)
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
        newRTCPeerConnection.ontrack = (event) => {
            setRemoteVideos(
                (prevSate) => {
                    if (!prevSate.includes(event.streams[0]))
                        return ([...prevSate, event.streams[0]])
                    else
                        return prevSate
                }
            )
        }

        newRTCPeerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
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