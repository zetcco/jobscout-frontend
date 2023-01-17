import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const initialState = {
    users: [],
    status_get: 'idle',
    status_post: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState, 
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export default usersSlice.reducer;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${BACKEND_URL}/posts`)
    const data = await response.json()
    return data
})