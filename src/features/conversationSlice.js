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
        newMessage: (state, action) => {
            console.log(action)
            const conversation = state.conversations.find((conversation) => conversation.id === action.payload.conversationId)
            console.log(conversation)
            conversation.messages = [ action.payload, ...conversation.messages ]
        }
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
export const { newConversation, newMessage } = conversationsSlice.actions;
export const selectConversationLoading = (state) => state.conversations.loading
export const selectConversations = (state) => state.conversations.conversations
export const selectMessages = (state, selectedConversationId)  => state.conversations.conversations.find((conversation) => conversation.id === selectedConversationId)?.messages

export const subsribeToServerPrivateMessage = (dispatch, getState) => {
    const state = getState();
    if (state.auth.token != null) {
        state.websocket.stompClient.subscribe(
            `/messaging/private/${state.auth.userInfo.id}`,
            (payload) => {
                const body = JSON.parse(payload.body)
                const data = JSON.parse(body.data)
                switch (body.type) {
                    case "MESSAGE":
                        dispatch(newMessage(data))
                        break;
                    case "CONVERSATION":
                        dispatch(newConversation(data));
                        break;
                    default:
                        break;
                }
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

export const sendNewMessage = createAsyncThunk('conversation/newMessage', async ({ conversationId, content } , { getState }) => {
    const state = getState()
    const message = JSON.stringify({
        conversationId,
        senderId: state.auth.userInfo.id,
        content
    })
    state.websocket.stompClient.send(`/app/messaging/${conversationId}`, {}, JSON.stringify({
        senderId: state.auth.userInfo.id,
        conversationId,
        type: "MESSAGE",
        data: message
    }))
})

export const fetchConversationMessages = createAsyncThunk('conversations/fetchMessages', async (selectedConversationId, { getState }) => {
    const state = getState()
    const response = await axios.get(`/messaging/${selectedConversationId}?page=${0}&count=10`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }});
    return { id: selectedConversationId, data: response.data }
})