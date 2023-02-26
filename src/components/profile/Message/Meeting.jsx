import { Button, TextField } from "@mui/material";
import { selectAuthUser, selectAuthUserToken } from "features/authSlice";
import { selectWebSocketStompClient } from "features/websocketSlice";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const rtcPeerConnection = new RTCPeerConnection()
export const Meeting = () => {

    const [ incomingCall, setIncomingCall ] = useState(false)

    const stompClient = useSelector(selectWebSocketStompClient)
    const authToken = useSelector(selectAuthUserToken)
    const user = useSelector(selectAuthUser)

    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const answerRef = useRef(null);

    const [ meetingId, setMeetingId ] = useState('');


    rtcPeerConnection.ontrack = (event) => {
        remoteVideo.current.srcObject = event.streams[0]
    }

    const onIceCandidate = (data) => {
        console.log("CALLER/ANSWERER: Setting CANDIDATE after recieving candidate")
        rtcPeerConnection.addIceCandidate(data)
        console.log("CALLER/ANSWERER: Setted CANDIDATE after recieving candidate")
    }

    const onAnswerAccept = (data) => {
        console.log(data)
        console.log(rtcPeerConnection)
        console.log("CALLER: Setting REMOTE_DESC after recieving Answer accept")
        rtcPeerConnection.setRemoteDescription(data)
        console.log("CALLER: Setted REMOTE_DESC after recieving Answer accept")
    }

    const onOffer = async (data, senderId) => {
        console.log("ANSWERER: Recieved Offer")
        console.log("ANSWERER: Setting REMOTE_DESC after recieving RemoteDesc offer")
        console.log(rtcPeerConnection)
        await rtcPeerConnection.setRemoteDescription(data)
        console.log(rtcPeerConnection)
        console.log("ANSWERER: Setted REMOTE_DESC after recieving RemoteDesc offer")

        rtcPeerConnection.onicecandidate = (event) => {
            console.log('came here 888')
            if (event.candidate) {
                console.log("CALLER: Sending CANIDATE object");
                sendMessage(event.candidate.toJSON(), "ICE_CANDIDATE", senderId)
            }
        }

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        console.log("ANSWERER: Creating LOCAL_DESC after creating Answer accept")
        const answer = rtcPeerConnection.createAnswer()
        console.log("ANSWERER: Setting LOCAL_DESC after creating Answer accept")
        await rtcPeerConnection.setLocalDescription(answer)
        console.log("ANSWERER: Setted LOCAL_DESC after creating Answer accept")
        
        console.log("ANSWERER: Sending ANSWER accept object");
        sendMessage(rtcPeerConnection.localDescription.toJSON(), "ANSWER", senderId)
    }

    const joinMeeting = async () => {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

        subscribe(meetingId)
        subscribe(meetingId, user.id)

        sendMessage({ content: `Hello everyone!! I'm ${user.id}` }, "JOIN")
    }

    const onCandidateJoin = async (data) => {
        rtcPeerConnection.onicecandidate = async (event) => {
            if (event.candidate) 
                sendMessage(event.candidate, "ICE_CANDIDATE", data.senderId)
        }

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        console.log(stream)
        localVideo.current.srcObject = stream

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        let offer = rtcPeerConnection.createOffer();
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

    const resolverFunctions = {
        iceCandidate: onIceCandidate, 
        offer: onOffer,
        answer: onAnswerAccept,
        join: onCandidateJoin
    }

    return (
        <>
            <TextField value={meetingId} onChange={(e) => setMeetingId(e.target.value)}/>
            <Button onClick={joinMeeting} variant='contained'>Join</Button>
            <Button ref={answerRef} variant='contained' disabled={!incomingCall}>Answer</Button>
            <video ref={localVideo} autoPlay/>
            <video ref={remoteVideo} autoPlay/>
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