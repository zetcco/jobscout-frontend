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
            state.loading = false
        },
        webSocketFailed: (state, action) => {
            state.stompClient = null
            state.connected = false
            state.loading = false
        },
        webSocketLoading: (state, action) => {
            state.loading = true
        }
    }
})

export default websocketSlice.reducer;
export const { webSocketConnected, webSocketFailed, webSocketLoading } = websocketSlice.actions;

export const connectToWebSocket = (dispatch, getState) => {
    const state = getState();
    dispatch(webSocketLoading())
    let sock = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`)
    console.log(sock)
    let stompClient = over(sock);
    stompClient.connect({"token": state.auth.token}, () => {
        dispatch(webSocketConnected(stompClient))
    }, (error) => {
        dispatch(webSocketFailed(error))
        console.error(error)
        console.error("Websocket connection error");
    })
}