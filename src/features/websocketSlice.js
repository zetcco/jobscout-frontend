import { createSlice } from "@reduxjs/toolkit"
import { Client } from "@stomp/stompjs";
import { setUnsubscribeToConversation, subsribeToServerPrivateMessage } from "./indexedConversationSlice";
import { setUnsubscribeToNotification, subscribeToNotification } from "./notificationSlice";

const initialState = {
    stompClient: null,
    connected: false,
    loading: false,
    error: null
}

export const selectWebSocketLoading = (state) => state.websocket.loading;
export const selectWebSocketConnected = (state) => state.websocket.connected;
export const selectWebSocketError = (state) => state.websocket.error;
export const selectWebSocketStompClient = (state) => state.websocket.stompClient;

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        webSocketConnected: (state, action) => {
            state.stompClient = action.payload
            state.connected = true
            state.loading = false
            state.error = null
        },
        webSocketFailed: (state, action) => {
            state.stompClient = null
            state.connected = false
            state.loading = false
            state.error = action.payload
        },
        webSocketLoading: (state, action) => {
            state.loading = true
        },
        webSocketFailedClear: (state, action) => {
            state.error = null
            state.connected = false
        },
        webSocketClear: (state, action) => {
            state.stompClient = null
            state.connected = false
        }
    }
})

export default websocketSlice.reducer;
export const { webSocketConnected, webSocketFailed, webSocketLoading, webSocketFailedClear, webSocketClear } = websocketSlice.actions;

export const connectToWebSocket = (dispatch, getState) => {
    const state = getState();
    dispatch(webSocketLoading())
    const stompClient = new Client({
        brokerURL: process.env.REACT_APP_WEBSOCKET_URL,
        connectHeaders: {
            token: state.auth.token
        },
        onConnect: () => {
            console.warn("WEB SOCKET onConnected")
            dispatch(webSocketConnected(stompClient))
            dispatch(subscribeToNotification)
            dispatch(subsribeToServerPrivateMessage)
        },
        debug: (str) => {
            // console.log(str)
        },
        onDisconnect: () => {
            console.warn("WEB SOCKET onDisconnected")
            dispatch(webSocketClear())
            dispatch(setUnsubscribeToConversation())
            dispatch(setUnsubscribeToNotification())
        },
        onWebSocketError: (error) => {
            console.warn("WEB SOCKET onError")
            dispatch(webSocketFailed(error))
        },
        onWebSocketClose: () => {
            console.warn("WEB SOCKET onClose")
            dispatch(webSocketClear())
            dispatch(setUnsubscribeToConversation())
            dispatch(setUnsubscribeToNotification())
        },
        reconnectDelay: 10000
    })
    stompClient.activate()
}

export const sendSignal = (destination, type, payload) => (_, getState) => {
    const state = getState();
    state.websocket.stompClient.publish({
        destination: "/app" + destination,
        body: JSON.stringify({
            senderId: state.auth.userInfo.id,
            type,
            data: JSON.stringify(payload)
        }),
    })
}