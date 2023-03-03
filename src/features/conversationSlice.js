import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    conversations: [],
    loading: false,
    error: null
}

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        newConversation: (state, action) => {
            state.conversations = [...state.conversations, action.payload ]
        }
    },
    extraReducers (builder) {
        builder
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.conversations = [...action.payload ]
                state.loading = false
            })
            .addCase(fetchConversations.pending, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = true
            })
    }
})

export default conversationsSlice.reducer;
export const { newConversation } = conversationsSlice.actions;
export const selectConversationLoading = (state) => state.conversations.loading
export const selectConversations = (state) => state.conversations.conversations

export const subsribeToServerPrivateMessage = (dispatch, getState) => {
    const state = getState();
    if (state.auth.token != null) {
        state.websocket.stompClient.subscribe(
            `/messaging/private/${state.auth.userInfo.id}`,
            (payload) => {
                dispatch(newConversation(JSON.parse( payload.body )));
            },
            {"token": state.auth.token}
        );
    }
};

export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (_, { getState, rejectWithValue }) => {
    const state = getState()
    return (await axios.get(`/messaging`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})