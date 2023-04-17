import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const notificationAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp)
})
const initialState = notificationAdapter.getInitialState({
    page: 0,
    loading: false,
    error: null,
    subscribed: false
})

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNewNotification: notificationAdapter.addOne,
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSubscribeToNotification: (state, action) => {
            state.subscribed = true
        },
        setUnsubscribeToNotification: (state, action) => {
            state.subscribed = false
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                notificationAdapter.upsertMany(state, action.payload)
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
export const {
    selectAll: selectNotifications,
    selectById: selectNotificationById,
    selectByIds: selectNotificationIds
} = notificationAdapter.getSelectors(state => state.notification)
export const selectNotificationsLoading = (state) => state.notification.loading;
export const { setNewNotification, setError, setSubscribeToNotification, setUnsubscribeToNotification } = notificationSlice.actions;
export const selectUnreadNotificationCount = createSelector(
    [selectNotifications],
    (notifications) => notifications.filter((notification) => notification.status ===  "UNREAD").length
)

export const subscribeToNotification = (dispatch, getState) => {
    const state = getState();
    if (!state.notification.subscribed) {
        if (state.auth.token != null) {
            state.websocket.stompClient.subscribe("/all/notify", (payload) => {
                dispatch(setNewNotification(JSON.parse(payload.body)));
            },
            {"token": state.auth.token}
            );
            state.websocket.stompClient.subscribe(
                `/user/${state.auth.userInfo.id}/notify`,
                (payload) => {
                    dispatch(setNewNotification(JSON.parse( payload.body )));
                },
                {"token": state.auth.token}
            );
            dispatch(setSubscribeToNotification())
        }
    }
};

export const fetchNotifications = createAsyncThunk('notification/fetchNotification', async (limit, { getState, rejectWithValue }) => {
    const state = getState()
    return (await axios.get(`/notification?limit=${limit}&offset=${state.notification.page}`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})

export const timeDifference = (current, previous) => {
    let elapsed = current - previous;
    return getReadableTime(elapsed)
}

export const getReadableTime = (time) => {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    if (time < msPerMinute) 
         return Math.round(time/1000) + 's';   
    else if (time < msPerHour) 
         return Math.round(time/msPerMinute) + 'm';   
    else if (time < msPerDay ) 
         return Math.round(time/msPerHour ) + 'h';   
    else if (time < msPerMonth) 
        return Math.round(time/msPerDay) + 'd';   
    else if (time < msPerYear) 
        return Math.round(time/msPerMonth) + 'mo';   
    else 
        return Math.round(time/msPerYear ) + 'y';   
}
