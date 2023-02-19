import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

export const selectNotifications = (state) => state.notification.notifications;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNewNotification: (state, action) => {
            state.notifications = [ ...state.notifications, JSON.parse(action.payload.body) ]
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers(builder) {

    }
})

export default notificationSlice.reducer;
export const { setNewNotification, setError } = notificationSlice.actions;

// export const subscribeToNotification = createAsyncThunk('notifications/subscribe', async (_, {getState, rejectWithValue}) => {
export const subscribeToNotification = (dispatch, getState) => {
    const state = getState();
    state.websocket.stompClient.subscribe("/all/notify", (payload) => {
        dispatch(setNewNotification(payload))
    })
    state.websocket.stompClient.subscribe(`/user/${state.auth.userInfo.id}/notify`, (payload) => {
        dispatch(setNewNotification(payload))
    })
}