import { createSlice } from "@reduxjs/toolkit"
import SockJS from "sockjs-client";
import { over } from "stompjs";

const initialState = {
    stompClient: null,
    connected: false,
    loading: false,
    error: null
}

export const selectWebSocketLoading = (state) => state.websocket.loading;
export const selectWebSocketConnected = (state) => state.websocket.connected;
export const selectWebSocketStompClient = (state) => state.websocket.stompClient;

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        webSocketConnected: (state, action) => {
            state.stompClient = action.payload
            state.connected = true
        },
        webSocketFailed: (state, action) => {
            state.stompClient = null
            state.connected = false
        }
    }
})

export default websocketSlice.reducer;
export const { webSocketConnected, webSocketFailed } = websocketSlice.actions;

export const connectToWebSocket = (dispatch, getState) => {
    const state = getState();
    let sock = new SockJS('http://localhost:8080/ws')
    let stompClient = over(sock);
    stompClient.connect({"token": state.auth.token}, () => {
        dispatch(webSocketConnected(stompClient))
    }, (error) => {
        dispatch(webSocketFailed(error))
        console.error("Websocket connection error");
    })
}