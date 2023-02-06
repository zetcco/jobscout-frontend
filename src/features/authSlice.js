import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode";

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
            .addMatcher(
                (action) => /auth.*fulfilled/.test(action.type),
                (state, action) => {
                    state.loading = false
                    state.token = action.payload.jwtToken
                    let { name, sub, role } = jwtDecode(state.token)
                    let userInfo = {name, email: sub, role}
                    state.userInfo = userInfo
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                }
            )
            .addMatcher(
                (action) => /auth.*rejected/.test(action.type),
                (state, action) => {
                    state.loading = false
                    state.error = action.payload
                }
            )
            .addMatcher(
                (action) => /auth.*pending/.test(action.type),
                (state, action) => {
                    state.loading = true
                }
            )
    }
})

export default authenticationSlice.reducer;

export const requestLogin = createAsyncThunk('auth/requestLogin', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`${BACKEND_URL}/auth/login`, data)).data
    } catch (e) {
        return rejectWithValue({ status: e.response.status, message: e.response.data.status })
    }
})

export const requestOrganizationSignup = createAsyncThunk('auth/requestOrganizationSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`${BACKEND_URL}/auth/register/organization`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const requestJobCreatorSignup = createAsyncThunk('auth/requestJobCreatorSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`${BACKEND_URL}/auth/register/jobcreator`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const requestJobSeekerSignup = createAsyncThunk('auth/requestJobSeekerSignup', async (data, { rejectWithValue }) => {
    try {
        return (await axios.post(`${BACKEND_URL}/auth/register/jobseeker`, data)).data
    } catch (e) {
        return handleError(e, rejectWithValue)
    }
})

export const uploadBusinessRegistration = createAsyncThunk('auth/uploadBusinessRegistration', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/upload/file`, { file: data }, { 
        headers: {
            "Content-Type": "multipart/form-data"
        }
     })).data
})

export const { logout } = authenticationSlice.actions;

const handleError = (e, rejectWithValue) => {
    if (e.code === "ERR_NETWORK")
        return rejectWithValue({ status: 500, message: e.message })
    return rejectWithValue({ status: e.response.status, message: e.response.data.status })
}