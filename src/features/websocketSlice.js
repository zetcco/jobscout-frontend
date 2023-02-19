import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { over } from "stompjs";

const initialState = {
    stompClient: null,
    loading: false,
    error: null
}

export const selectNotifications = (state) => state.notifications.notifications;

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(connectToWebSocket.fulfilled, (state, action) => {
                state.stompClient = action.payload
                state.loading = false
            })
            .addCase(connectToWebSocket.pending, (state, action) => {
                state.loading = true
            })
            .addCase(connectToWebSocket.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const connectToWebSocket = createAsyncThunk('websocket/connect', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    let sock = new SockJS('http://localhost:8080/ws')
    let stompClient = over(sock);
    stompClient.connect({"token": state.auth.token}, () => {
        return stompClient;
    }, (error) => {
        console.error("Websocket connection error");
        return rejectWithValue(error);
    })
})