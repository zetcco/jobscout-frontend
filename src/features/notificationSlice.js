import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

export const selectNotifications = (state) => state.notifications.notifications;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers(builder) {
    }
})

export const connectToWebSocket = createAsyncThunk('websocket', async (_, {getState}) => {
    try {
    } catch (e) {

    }
})