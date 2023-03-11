import { createSlice } from "@reduxjs/toolkit"
import { Client } from "@stomp/stompjs";

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
        }
    }
})

export default websocketSlice.reducer;
export const { webSocketConnected, webSocketFailed, webSocketLoading, webSocketFailedClear } = websocketSlice.actions;

export const connectToWebSocket = (dispatch, getState) => {
    const state = getState();
    dispatch(webSocketLoading())
    const stompClient = new Client({
        brokerURL: `ws://localhost:8080/ws`,
        connectHeaders: {
            token: state.auth.token
        },
        onConnect: () => {
            dispatch(webSocketConnected(stompClient))
        },
        debug: (str) => {
            console.log(str)
        },
        onWebSocketError: (error) => {
            dispatch(webSocketFailed(error))
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