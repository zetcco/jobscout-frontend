import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode";

const initialState = {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    token: JSON.parse(localStorage.getItem('token')),
    error: null,
    success: false
}

export const selectAuthUser = (state) => state.auth.userInfo;
export const selectAuthUserId = (state) => state.auth.userInfo.id;
export const selectAuthUserToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthSuccess = (state) => state.auth.success;
export const selectAccountEnabled = (state) => state.auth.userInfo?.enabled;
export const selectAccountCompleted = (state) => state.auth.userInfo?.complete;

const getServerClient = (token) => axios.create({
    baseURL: '',
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export let serverClient = getServerClient(JSON.parse(localStorage.getItem('token')))

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, _) {
            state.token = ""
            state.userInfo = ""
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            serverClient = null
        },
        resetSuccess(state, _) {
            state.success = false
        },
        clearError(state, _) {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                (action) => /auth\/profile.*fulfilled/.test(action.type),
                (state, action) => {
                    const userInfo = { ...state.userInfo, ...action.payload }
                    state.userInfo = userInfo
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    state.loading = false
                    state.success = true
                }
            )
            .addMatcher(
                (action) => /auth\/profile.*pending/.test(action.type),
                (state, action) => {
                    state.loading = true
                }
            )
            .addMatcher(
                (action) => /auth\/profile.*rejected/.test(action.type),
                (state, action) => {
                    console.log(action)
                    state.error = action.payload
                    state.loading = false
                }
            )
            .addMatcher(
                (action) => /auth\/auth\/register.*fulfilled/.test(action.type),
                (state, action) => {
                    state.loading = false
                    state.userInfo = { enabled: false }
                }
            )
            .addMatcher(
                (action) => /auth\/auth\/login.*fulfilled/.test(action.type),
                (state, action) => {
                    state.token = action.payload.jwtToken
                    let { sub, id, role, complete } = jwtDecode(state.token)
                    let userInfo = {id, email: sub, role, complete, enabled: true }
                    state.userInfo = userInfo
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                    state.loading = false
                    serverClient = getServerClient(state.token)
                }
            )
            .addMatcher(
                (action) => /auth\/.*rejected/.test(action.type),
                (state, action) => {
                    console.log(action);
                    state.error = action.payload
                    state.loading = false
                }
            )
            .addMatcher(
                (action) => /auth\/.*pending/.test(action.type),
                (state, action) => {
                    state.loading = true
                }
            )
    }
})

export default authenticationSlice.reducer;

export const requestLogin = createAsyncThunk('auth/auth/login/requestLogin', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/login`, data)).data
    } catch (e) {
        return handleCommsError(e, rejectWithValue)
    }
})

export const requestOrganizationSignup = createAsyncThunk('auth/auth/register/requestOrganizationSignup', async (data, { rejectWithValue }) => {
    try {
        var formData = new FormData()
        formData.append('request', new Blob([JSON.stringify(data.request)], { type: "application/json" }));
        formData.append('file', data.file[0]);
        return (await axios.post(`/auth/register/organization`, formData)).data
    } catch (e) {
        return handleCommsError(e, rejectWithValue)
    }
})

export const requestJobCreatorSignup = createAsyncThunk('auth/auth/register/requestJobCreatorSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/register/jobcreator`, data)).data
    } catch (e) {
        return handleCommsError(e, rejectWithValue)
    }
})

export const requestJobSeekerSignup = createAsyncThunk('auth/auth/register/requestJobSeekerSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/register/jobseeker`, data)).data
    } catch (e) {
        return handleCommsError(e, rejectWithValue)
    }
})

export const uploadBusinessRegistration = createAsyncThunk('auth/auth/uploadBusinessRegistration', async (data) => {
    return (await axios.post(`/auth/upload/file`, { file: data }, { 
        headers: {
            "Content-Type": "multipart/form-data"
        }
     })).data
})

export const requestUserProfile = createAsyncThunk('auth/profile/requestUserProfile', async (_, { getState }) => {
    const state = getState()
    return (await axios.get(`/user/`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})

export const updateDisplayPicture = createAsyncThunk('auth/profile/updateDisplayPicture', async (data, { getState, rejectWithValue }) => {
    try {
        const state = getState()
        var formData = new FormData()
        formData.append('file', data.file[0]);
        return (await axios.put(`/user/display-picture`, formData, { headers: {
            "Authorization": `Bearer ${state.auth.token}`
        }})).data;
    } catch (e) {
        return handleCommsError(e, rejectWithValue)
    }
})

export const { logout, resetSuccess, clearError } = authenticationSlice.actions;

export const handleCommsError = (e, rejectWithValue) => {
    console.log(e)
    if (e.response.status === 500)
        return rejectWithValue({ status: 500, message: (e.response.data.message ? e.response.data.message : "Internal Server Error") })
    return rejectWithValue(e.response.data)
}
