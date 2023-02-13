import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode";

const initialState = {
    loading: 'idle',
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    token: JSON.parse(localStorage.getItem('token')),
    error: null
}

export const selectAuthUser = (state) => state.auth.userInfo;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, _) {
            state.token = ""
            state.userInfo = ""
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        }
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                (action) => /auth\/profile.*fulfilled/.test(action.type),
                (state, action) => {
                    state.userInfo = { ...action.payload, ...state.userInfo }
                    state.loading = 'success'
                }
            )
            .addMatcher(
                (action) => /auth\/profile.*pending/.test(action.type),
                (state, action) => {
                    state.userInfo = { ...action.payload, ...state.userInfo }
                    state.loading = 'loading'
                }
            )
            .addMatcher(
                (action) => /auth\/profile.*rejected/.test(action.type),
                (state, action) => {
                    console.log(action)
                    state.error = action.payload
                    state.loading = 'failed'
                }
            )
            .addMatcher(
                (action) => /auth\/auth.*fulfilled/.test(action.type),
                (state, action) => {
                    state.token = action.payload.jwtToken
                    let { sub, role } = jwtDecode(state.token)
                    let userInfo = {email: sub, role}
                    state.userInfo = userInfo
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                    state.loading = 'success'
                }
            )
            .addMatcher(
                (action) => /auth\/.*rejected/.test(action.type),
                (state, action) => {
                    console.log(action);
                    state.error = action.payload
                    state.loading = 'failed'
                }
            )
            .addMatcher(
                (action) => /auth\/.*pending/.test(action.type),
                (state, action) => {
                    state.loading = 'loading'
                }
            )
    }
})

export default authenticationSlice.reducer;

export const requestLogin = createAsyncThunk('auth/auth/requestLogin', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/login`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const requestOrganizationSignup = createAsyncThunk('auth/auth/requestOrganizationSignup', async (data, { rejectWithValue }) => {
    try {
        var formData = new FormData()
        formData.append('request', new Blob([JSON.stringify(data.request)], { type: "application/json" }));
        formData.append('file', data.file[0]);
        return (await axios.post(`/auth/register/organization`, formData)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const requestJobCreatorSignup = createAsyncThunk('auth/auth/requestJobCreatorSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/register/jobcreator`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const requestJobSeekerSignup = createAsyncThunk('auth/auth/requestJobSeekerSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`/auth/register/jobseeker`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
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

export const updateDisplayPicture = createAsyncThunk('auth/profile/updateDisplayPicture', async (data, { getState }) => {
    const state = getState()
    var formData = new FormData()
    formData.append('file', data.file[0]);
    const response = (await axios.put(`/user/display-picture`, formData, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
    console.log(response);
})

export const { logout } = authenticationSlice.actions;

const handleError = (e, rejectWithValue) => {
    console.log(e)
    if (e.code === "ERR_NETWORK")
        return rejectWithValue({ status: 500, message: e.message })
    return rejectWithValue(e.response.data)
}