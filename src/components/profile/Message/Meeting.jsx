import { Button, Select, TextField } from "@mui/material";
import { Video } from "components/Video";
import { selectAuthUser, selectAuthUserToken } from "features/authSlice";
import { selectWebSocketStompClient } from "features/websocketSlice";
import React, { createElement, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const rtcPeerConnection = new RTCPeerConnection()
export const Meeting = () => {

    const [ incomingCall, setIncomingCall ] = useState(false)

    const stompClient = useSelector(selectWebSocketStompClient)
    const authToken = useSelector(selectAuthUserToken)
    const user = useSelector(selectAuthUser)

    const localVideo = useRef(null);
    const answerRef = useRef(null);

    const [ remoteVideos, setRemoteVideos ] = useState([])

    const [ meetingId, setMeetingId ] = useState('');

    const [ localStream, setLocalStream ] = useState(null);
    const [ devices, setDevices ] = useState([]);

    useEffect(() => {
        const setDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
        } 
    }, [])


    rtcPeerConnection.ontrack = (event) => {
        setRemoteVideos([...remoteVideos, <Video key={remoteVideos.length + 1} srcObject={event.streams[0]}/>])
    }

    const onIceCandidate = (data) => {
        console.warn(`Recieved ICE_CANDIDATE from ${data}`)
        rtcPeerConnection.addIceCandidate(data)
        console.warn(`Set ICE_CANDIDATE ICE_CANDIDATE from ${data}`)
    }

    const onAnswerAccept = (data) => {
        console.warn(`Recieved ANSWER from ${data}`)
        rtcPeerConnection.setRemoteDescription(data)
        console.warn(`Set incoming ANSWER from ${data}`)
    }

    const onOffer = async (data, senderId) => {
        console.warn(`Recieved OFFER from ${senderId}`)
        await rtcPeerConnection.setRemoteDescription(data)

        rtcPeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                sendMessage(event.candidate.toJSON(), "ICE_CANDIDATE", senderId)
                console.warn(`Sent ICE_CANDIDATE to ${senderId}`)
            }
        }

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

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
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

        subscribe(meetingId)
        subscribe(meetingId, user.id)

        sendMessage({ content: `Hello everyone!! I'm ${user.id}` }, "JOIN")
        console.warn(`Sent JOIN message for everyone`)
    }

    const onCandidateJoin = async (data) => {
        console.warn(`On response to new user ${data.senderId} JOIN, `)
        rtcPeerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                sendMessage(event.candidate, "ICE_CANDIDATE", data.senderId)
                console.warn(`Sent ICE_CANDIDATE to ${data.senderId}`)
            }
        }

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

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

    const resolverFunctions = {
        iceCandidate: onIceCandidate, 
        offer: onOffer,
        answer: onAnswerAccept,
        join: onCandidateJoin
    }

    return (
        <>
            {/* <Select value={} onChange={}/> */}
            <TextField value={meetingId} onChange={(e) => setMeetingId(e.target.value)}/>
            <Button onClick={joinMeeting} variant='contained'>Join</Button>
            <Button ref={answerRef} variant='contained' disabled={!incomingCall}>Answer</Button>
            <video ref={localVideo} autoPlay/>
            {
                remoteVideos
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
            iceCandidate(new RTCIceCandidate(data))
            break;
        case "OFFER":
            offer(new RTCSessionDescription(data), senderId)
            break;
        case "ANSWER":
            answer(new RTCSessionDescription(data))
            break;
        case "JOIN":
            join({ senderId, data })
            break;
        default:
            break;
    }
}