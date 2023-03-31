import { serverClient } from "./authSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    meetingInfo: null,
    peerConnections: [],
    remoteVideos: [],
    localStreams: {
        audio: '',
        video: ''
    },
    mediaDevices: {},
    loading: false,
    error: null
}

export const selectMeetingPeerConnections = (state) => state.meet.peerConnections;
export const selectMeetingInfo = (state) => state.meet.meetingInfo;
export const selectMeetingRemoteVideos = (state) => state.meet.remoteVideos;
export const selectMeetingMediaDevices = (state) => state.meet.mediaDevices;
export const selectMeetingLocalStreams = (state) => state.meet.localStreams;
export const selectMeetingError = (state) => state.meet.error;
export const selectMeetingLoading = (state) => state.meet.loading;

const meetSlice = createSlice({
    name: 'meet',
    initialState,
    reducers: {
        setLocalStream: (state, action) => {
            console.log(action.payload)
            state.localStreams = {...state.localStreams, ...action.payload}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMeeting.fulfilled, (state, action) => {
                state.meetingInfo = action.payload
                state.loading = false
            })
            .addCase(fetchMeeting.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(fetchMeeting.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchMediaDevices.fulfilled, (state, action) => {
                console.log(action.payload)
                state.mediaDevices = action.payload
            })
    }
})

export default meetSlice.reducer;
export const { setLocalStream } = meetSlice.actions;

export const fetchMeeting = createAsyncThunk('meet/fetchMeeting', async ({ link }, { rejectWithValue }) => {
    try {
        const response = await serverClient.get(`/meeting/${link}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchMediaDevices = createAsyncThunk('meet/fetchMediaDevices', async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = { devices: {}, ids: [] }
    const videoDevices = { devices: {}, ids: [] }
    devices.forEach(device => {
        if (device.kind === 'videoinput' && !(device.deviceId in videoDevices.devices)) {
            videoDevices.devices[device.deviceId] = device
            videoDevices.ids.push(device.deviceId)
        }
        else if (device.kind === 'audioinput' && !(device.deviceId in audioDevices.devices)) {
            audioDevices.devices[device.deviceId] = device
            audioDevices.ids.push(device.deviceId)
        }
    });
    return { videoDevices, audioDevices }
})