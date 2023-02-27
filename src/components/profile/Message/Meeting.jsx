import { Button, MenuItem, Select, TextField } from "@mui/material";
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
    const [ para, setPara ] = useState([])

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

    useEffect(() => {
        console.log("**************")
        console.log(remoteVideos)
    }, [remoteVideos])

    const onIceCandidate = (data, senderId) => {
        console.warn(`Recieved ICE_CANDIDATE from ${data}`)
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection
        rtcPeerConnection.addIceCandidate(data)
        console.warn(`Set ICE_CANDIDATE ICE_CANDIDATE from ${data}`)
    }

    const onAnswerAccept = (data, senderId) => {
        const rtcPeerConnection = peerConnections.find(obj => obj.peer === senderId).connection

        console.warn(`Recieved ANSWER from ${data}`)
        rtcPeerConnection.setRemoteDescription(data)
        console.warn(`Set incoming ANSWER from ${data}`)
    }

    const onOffer = async (data, senderId) => {

        const rtcPeerConnection = getNewPeerConnection(senderId).connection;

        console.warn(`Recieved OFFER from ${senderId}`)
        await rtcPeerConnection.setRemoteDescription(data)

        const stream = await setLocalStreamVideo()

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        const answer = rtcPeerConnection.createAnswer()
        console.warn(`Answer CREATED for user ${senderId}`)
        await rtcPeerConnection.setLocalDescription(answer)
        
        sendMessage(rtcPeerConnection.localDescription.toJSON(), "ANSWER", senderId)
        console.warn(`Answer SENT for user ${senderId}`)
    }

    const joinMeeting = async () => {
        await setLocalStreamVideo()

        subscribe(meetingId)
        subscribe(meetingId, user.id)

        sendMessage({ content: `User(id: ${user.id}) Joined` }, "JOIN")
        console.warn(`Sent JOIN message for everyone`)
    }

    const onCandidateJoin = async (data) => {

        console.warn(`On response to new user ${data.senderId} JOIN, `)

        const rtcPeerConnection = getNewPeerConnection(data.senderId).connection

        setPara([...para, new Date()])

        console.error(remoteVideos)
        console.log(para)

        const stream = await setLocalStreamVideo()

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        let offer = rtcPeerConnection.createOffer();
        console.warn(`Offer CREATED for user ${data.senderId}`)
        await rtcPeerConnection.setLocalDescription(offer)

        sendMessage(rtcPeerConnection.localDescription.toJSON(), "OFFER", data.senderId)
        console.warn(`Offer SENT for user ${data.senderId}`)
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

    const setLocalStreamVideo = async () => {
        const constraint = {
            video: { deviceId: { exact: localStream.deviceId } },
            audio: false
        }
        let stream = await navigator.mediaDevices.getUserMedia(constraint)
        localVideo.current.srcObject = stream
        return stream
    }

    const getNewPeerConnection = (senderId = null) => {

        const newRTCPeerConnection = new RTCPeerConnection();
        newRTCPeerConnection.ontrack = (event) => {
            console.log('fired bitch')
            console.info(remoteVideos)
            console.info(event.streams[0])
            setRemoteVideos((prevSate) => ([...prevSate, event.streams[0]]))
        }


        newRTCPeerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                sendMessage(event.candidate, "ICE_CANDIDATE", senderId)
                console.warn(`Sent ICE_CANDIDATE to ${senderId}`)
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

    console.log(remoteVideos)
    console.log(para)

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
            <video ref={localVideo} autoPlay/>
            {
                remoteVideos.map((stream, index) => (
                    <Video srcObject={stream} key={index}/>
                ))
            }
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