import { createSlice } from "@reduxjs/toolkit"

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

    }
})

export default conversationsSlice.reducer;
export const { newConversation, newMessage, updateConversation, isTyping, stopTyping, setSubscribeToConversation, setUnsubscribeToConversation } = conversationsSlice.actions;
export const selectTyping = (state, selectedConversationId) => state.conversations.conversations.find((conversation) => conversation.id === selectedConversationId)?.typing