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
        },
    },
    extraReducers (builder) {
        builder
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.conversations = [ ...action.payload ]
                state.loading = false
            })
            .addCase(fetchConversations.pending, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = true
            })
            .addCase(fetchConversationMessages.fulfilled, (state, action) => {
                const conversation = state.conversations.find((conversation) => conversation.id === action.payload.id)
                conversation.messages = action.payload.data
            })
            .addCase(fetchConversationMessages.pending, (state, action) => {
                console.log("Fetching messages")
            })
            .addCase(fetchConversationMessages.rejected, (state, action) => {
                console.log(action)
            })
    }
})

export default conversationsSlice.reducer;
export const { newConversation } = conversationsSlice.actions;
export const selectConversationLoading = (state) => state.conversations.loading
export const selectConversations = (state) => state.conversations.conversations
export const selectMessages = (state, selectedConversationId)  => state.conversations.conversations.find((conversation) => conversation.id === selectedConversationId)?.messages

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

export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (_, { getState }) => {
    const state = getState()
    return (await axios.get(`/messaging`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})

export const newMessage = createAsyncThunk('conversation/newMessage', async ({ conversationId, content } , { getState }) => {
    const state = getState()
    state.websocket.stompClient.send(`/messaging/${conversationId}`, {}, JSON.stringify({
        sender: {
            id: state.auth.userInfo.id
        },
        content: content
    }))
})

export const fetchConversationMessages = createAsyncThunk('conversations/fetchMessages', async (selectedConversationId, { getState }) => {
    const state = getState()
    const response = await axios.get(`/messaging/${selectedConversationId}?page=${0}&count=10`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }});
    return { id: selectedConversationId, data: response.data }
})