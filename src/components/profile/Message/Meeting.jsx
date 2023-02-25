import { Button, Typography } from "@mui/material";
import { selectAuthUser, selectAuthUserToken } from "features/authSlice";
import { selectWebSocketConnected, selectWebSocketStompClient } from "features/websocketSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const rtcPeerConnection = new RTCPeerConnection()
export const Meeting = () => {

    const [ incomingCall, setIncomingCall ] = useState(false)

    const websocketConnected = useSelector(selectWebSocketConnected);
    const stompClient = useSelector(selectWebSocketStompClient)
    const authToken = useSelector(selectAuthUserToken)
    const user = useSelector(selectAuthUser)

    const dispatch = useDispatch()

    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const answerRef = useRef(null);

    useEffect(() => {
        if (websocketConnected) {
            // dispatch(subscribeToRTC)
            stompClient.subscribe(
                `/user/${user.id}/call`,
                (payload) => {
                    payload = JSON.parse(payload.body)
                    rtcSignalResolver(payload, { iceCandidate: addIceCandidate, offer: onOffer, answer: onAnswerAccept })
                },
                {"token": authToken}
            );
            
        }
    }, [dispatch, websocketConnected])

    rtcPeerConnection.ontrack = (event) => {
        console.log("On track fiered")
        console.log(event)
        remoteVideo.current.srcObject = event.streams[0]
    }

    const addIceCandidate = (data) => {
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

    const onOffer = async (data) => {
        console.log("ANSWERER: Recieved Offer")
        console.log("ANSWERER: Setting REMOTE_DESC after recieving RemoteDesc offer")
        console.log(rtcPeerConnection)
        await rtcPeerConnection.setRemoteDescription(data)
        console.log("ANSWERER: Setted REMOTE_DESC after recieving RemoteDesc offer")

        setIncomingCall(true)
        await new Promise((resolve, reject) => {
            answerRef.current.addEventListener('click', (e) => {
                resolve("Resolved")
            }, {once: true})
        })
        setIncomingCall(false)

        rtcPeerConnection.onicecandidate = (event) => {
            console.log('came here 888')
            if (event.candidate) {
                console.log("CALLER: Sending CANIDATE object");
                stompClient.send('/app/call', {}, JSON.stringify({
                    senderId: 105,
                    recieverId: 95,
                    type: "ICE_CANDIDATE",
                    data: JSON.stringify(event.candidate.toJSON())
                }))
            }
        }

        console.log("ANSWERER: Creating LOCAL_DESC after creating Answer accept")
        const answer = rtcPeerConnection.createAnswer()
        console.log("ANSWERER: Setting LOCAL_DESC after creating Answer accept")
        await rtcPeerConnection.setLocalDescription(answer)
        console.log("ANSWERER: Setted LOCAL_DESC after creating Answer accept")
        
        console.log("ANSWERER: Sending ANSWER accept object");
        stompClient.send('/app/call', {}, JSON.stringify({
            senderId: 105,
            recieverId: 95,
            type: "ANSWER",
            data: JSON.stringify(rtcPeerConnection.localDescription.toJSON())
        }))
    }

    const call = async () => {

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        localVideo.current.srcObject = stream

        rtcPeerConnection.onicecandidate = (event) => {
            console.log(rtcPeerConnection)
            if (event.candidate) {
                console.log("CALLER: Sending CANIDATE object");
                stompClient.send('/app/call', {}, JSON.stringify({
                    senderId: 95,
                    recieverId: 105,
                    type: "ICE_CANDIDATE",
                    data: JSON.stringify(event.candidate.toJSON())
                }))
            }
        }

        stream.getTracks().forEach(track => {
            rtcPeerConnection.addTrack(track, stream)
        });

        let offer = rtcPeerConnection.createOffer();
        console.log("CALLER: Setting LOCAL_DESC after creating Offer ********")
        await rtcPeerConnection.setLocalDescription(offer)
        console.log(rtcPeerConnection)
        console.log("CALLER: Sending LOCAL_DESC after creating Offer ********")
        stompClient.send('/app/call', {}, JSON.stringify({
            senderId: 95,
            recieverId: 105,
            type: "OFFER",
            data: JSON.stringify(rtcPeerConnection.localDescription.toJSON())
        }))

    }

    return (
        <>
            <Button onClick={call} variant='contained'>Call</Button>
            <Button ref={answerRef} variant='contained' disabled={!incomingCall}>Answer</Button>
            <video ref={localVideo} autoPlay/>
            <video ref={remoteVideo} autoPlay/>
        </>
    )
};

const rtcSignalResolver = (signal, actions) => {
    const { senderId, recieverId, type, data } = signal
    const { iceCandidate, offer, answer } = actions

    switch (type) {
        case "ICE_CANDIDATE":
            iceCandidate(new RTCIceCandidate(JSON.parse(data)))
            break;
        case "OFFER":
            offer(new RTCSessionDescription(JSON.parse(data)))
            break;
        case "ANSWER":
            answer(new RTCSessionDescription(JSON.parse(data)))
            break;
        default:
            break;
    }
}