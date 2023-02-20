import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleCommsError } from "./authSlice";

const initialState = {
    notifications: [],
    page: 0,
    loading: false,
    error: null,
};

export const selectNotifications = (state) => state.notification.notifications;
export const selectNotificationsLoading = (state) => state.notification.loading;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNewNotification: (state, action) => {
            state.notifications = [
                JSON.parse(action.payload.body),
                ...state.notifications
            ];
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = [ ...state.notifications, ...action.payload ]
                state.page = state.page + 1
                state.loading = false
            })
            .addCase(fetchNotifications.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.error = action.error
                state.loading = false
            })
    },
});

export default notificationSlice.reducer;
export const { setNewNotification, setError } = notificationSlice.actions;

// export const subscribeToNotification = createAsyncThunk('notifications/subscribe', async (_, {getState, rejectWithValue}) => {
export const subscribeToNotification = (dispatch, getState) => {
    const state = getState();
    state.websocket.stompClient.subscribe("/all/notify", (payload) => {
        dispatch(setNewNotification(payload));
    });
    state.websocket.stompClient.subscribe(
        `/user/${state.auth.userInfo.id}/notify`,
        (payload) => {
            dispatch(setNewNotification(payload));
        }
    );
};

export const fetchNotifications = createAsyncThunk('notification/fetchNotification', async (limit, { getState, rejectWithValue }) => {
    const state = getState()
    return (await axios.get(`/notification?limit=${limit}&offset=${state.notification.page}`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})

export const timeDifference = (current, previous) => {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) 
         return Math.round(elapsed/1000) + 's';   
    else if (elapsed < msPerHour) 
         return Math.round(elapsed/msPerMinute) + 'm';   
    else if (elapsed < msPerDay ) 
         return Math.round(elapsed/msPerHour ) + 'h';   
    else if (elapsed < msPerMonth) 
        return Math.round(elapsed/msPerDay) + 'd';   
    else if (elapsed < msPerYear) 
        return Math.round(elapsed/msPerMonth) + 'mo';   
    else 
        return Math.round(elapsed/msPerYear ) + 'y';   
}
