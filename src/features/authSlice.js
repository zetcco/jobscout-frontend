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

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(requestLogin.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.jwtToken
                localStorage.setItem('token', JSON.stringify(action.payload.jwtToken))
                let userInfo = {
                    name: action.payload.name,
                    email: action.payload.email,
                    role: action.payload.role
                }
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
    }
})

export default authenticationSlice.reducer;

export const requestLogin = createAsyncThunk('auth/requestLogin', async (data) => {
    return (await axios.post(`${BACKEND_URL}/auth/login`, data)).data
})