import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const initialState = {
    loading: false,
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
            .addCase(requestLogin.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.jwtToken
                localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                let userInfo = getUserInfo(action.payload);
                state.userInfo = userInfo
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .addCase(requestLogin.pending, (state, action) => {
                state.loading = true
            })
            .addCase(requestLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(requestOrganizationSignup.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.jwtToken
                localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                let userInfo = getUserInfo(action.payload);
                state.userInfo = userInfo
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .addCase(requestOrganizationSignup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(requestOrganizationSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(requestJobCreatorSignup.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.jwtToken
                localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                let userInfo = getUserInfo(action.payload);
                state.userInfo = userInfo
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .addCase(requestJobCreatorSignup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(requestJobCreatorSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(requestJobSeekerSignup.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.jwtToken
                localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                let userInfo = getUserInfo(action.payload);
                state.userInfo = userInfo
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .addCase(requestJobSeekerSignup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(requestJobSeekerSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(uploadBusinessRegistration.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(uploadBusinessRegistration.pending, (state, action) => {
                state.loading = true
            })
            .addCase(uploadBusinessRegistration.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default authenticationSlice.reducer;

export const requestLogin = createAsyncThunk('auth/requestLogin', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/login`, data)).data
})

export const requestOrganizationSignup = createAsyncThunk('auth/requestOrganizationSignup', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/register/organization`, data)).data
})

export const requestJobCreatorSignup = createAsyncThunk('auth/requestJobCreatorSignup', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/register/jobcreator`, data)).data
})

export const requestJobSeekerSignup = createAsyncThunk('auth/requestJobSeekerSignup', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/register/jobseeker`, data)).data
})

export const uploadBusinessRegistration = createAsyncThunk('auth/uploadBusinessRegistration', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/upload/file`, { file: data }, { 
        headers: {
            "Content-Type": "multipart/form-data"
        }
     })).data
})

export const { logout } = authenticationSlice.actions;

const getUserInfo = (payload) => ({ name: payload.name, email: payload.email, role: payload.role })