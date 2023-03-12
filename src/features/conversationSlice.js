import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { sendSignal } from "./websocketSlice";

const initialState = {
    conversations: [],
    loading: false,
    error: null,
    subscribed: false
}

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setSubscribeToConversation: (state, action) => {
            state.subscribed = true
        },
        setUnsubscribeToConversation: (state, action) => {
            state.subscribed = false
        },
        newConversation: (state, action) => {
            state.conversations = [...state.conversations, action.payload ]
        },
        updateConversation: (state, action) => {
            const conversation = state.conversations.find(conversation => conversation.id === action.payload.id)
            const { name, picture } = action.payload
            if (conversation) {
                conversation.name = name
                conversation.picture = picture
            }
        },
        isTyping: (state, action) => {
            const conversation = state.conversations.find(conversation => conversation.id === action.payload.conversationId)
            conversation.typing = action.payload.name
        },
        stopTyping: (state, action) => {
            const conversation = state.conversations.find(conversation => conversation.id === action.payload)
            if (conversation)
                conversation.typing = null
        },
        newMessage: (state, action) => {
            const conversation = state.conversations.find((conversation) => conversation.id === action.payload.conversationId)
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
export const { newConversation, newMessage, updateConversation, isTyping, stopTyping, setSubscribeToConversation, setUnsubscribeToConversation } = conversationsSlice.actions;
export const selectConversationLoading = (state) => state.conversations.loading
export const selectConversations = (state) => state.conversations.conversations
export const selectMessages = (state, selectedConversationId)  => state.conversations.conversations.find((conversation) => conversation.id === selectedConversationId)?.messages
export const selectTyping = (state, selectedConversationId) => state.conversations.conversations.find((conversation) => conversation.id === selectedConversationId)?.typing

export const subsribeToServerPrivateMessage = (dispatch, getState) => {
    const state = getState();
    if (!state.conversations.subscribed) {
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
                        case "TYPING":
                            dispatch(isTyping(data))
                            break;
                        case "CONVERSATION":
                            dispatch(newConversation(data));
                            break;
                        case "CONVERSATION_UPDATE":
                            dispatch(updateConversation(data));
                            break;
                        default:
                            break;
                    }
                },
                {"token": state.auth.token}
            );
            dispatch(setSubscribeToConversation())
        }
    }
};

export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (_, { getState }) => {
    const state = getState()
    return (await axios.get(`/messaging`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }})).data;
})

export const sendSignalToConversation = (conversation, type, message = undefined) => (dispatch, getState) => {
    const state = getState()
    dispatch(sendSignal(
        `/messaging/${conversation}`, 
        type, 
        { 
            conversationId: conversation,
            senderId:  state.auth.userInfo.id,
            content: message 
        }
    ))
}

export const fetchConversationMessages = createAsyncThunk('conversations/fetchMessages', async (selectedConversationId, { getState }) => {
    const state = getState()
    const response = await axios.get(`/messaging/${selectedConversationId}?page=${0}&count=10`, { headers: {
        "Authorization": `Bearer ${state.auth.token}`
    }});
    return { id: selectedConversationId, data: response.data }
})