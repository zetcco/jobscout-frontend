import axios from "axios";

const { createEntityAdapter, createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const conversationAdapter = createEntityAdapter()

const initialState = conversationAdapter.getInitialState({
    messageError: null,
    messageLoading: false,
    conversationLoading: false,
    conversationError: null,
    subscribed: false
})

const conversationSlice = createSlice({
    name: "conversationSlice",
    initialState,
    reducers: {
        setNewConversation: conversationAdapter.addOne,
        messageRecieved: (state, action) => {
            state.entities[action.payload.conversationId].messages.push(action.payload)
        }
    },
    extraReducers (builder) {
        builder
            .addCase(fetchConversationsIndexed.fulfilled, (state, action) => {
                conversationAdapter.upsertMany(state, action.payload)
                state.conversationLoading = false
            })
            .addCase(fetchConversationsIndexed.pending, (state, action) => {
                state.conversationLoading = true
            })
            .addCase(fetchConversationsIndexed.rejected, (state, action) => {
                state.conversationError = action.payload
                state.conversationLoading = false
            })
            .addCase(fetchConversationMessagesIndexed.fulfilled, (state, action) => {
                state.entities[action.payload.id].messages = action.payload.data.slice().reverse()
                state.messageLoading = false
            })
            .addCase(fetchConversationMessagesIndexed.pending, (state, action) => {
                state.messageLoading = true
            })
            .addCase(fetchConversationMessagesIndexed.rejected, (state, action) => {
                state.messageError = action.payload
                state.messageLoading = false
            })
    }
})

export default conversationSlice.reducer;

export const {
    selectAll: selectConversations,
    selectById: selectConversationById,
    selectByIds: selectConversationIds
} = conversationAdapter.getSelectors(state => state.indexedConversations)

export const { setNewConversation, messageRecieved } = conversationSlice.actions;
export const selectMessagesIndexed = (state, conversationId) => {
    return state.indexedConversations.entities[conversationId]?.messages
}
export const selectConversationLoading = (state) => state.indexedConversations.conversationLoading;
export const selectConversationError = (state) => state.indexedConversations.conversationError;

export const fetchConversationsIndexed = createAsyncThunk('indexedConversations/fetchConversations', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState()
        return (await axios.get(`/messaging`, { headers: {
            "Authorization": `Bearer ${state.auth.token}`
        }})).data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchConversationMessagesIndexed = createAsyncThunk('conversations/fetchMessages', async (selectedConversationId, { getState, rejectWithValue }) => {
    try {
        const state = getState()
        const response = await axios.get(`/messaging/${selectedConversationId}?page=${0}&count=10`, { headers: {
            "Authorization": `Bearer ${state.auth.token}`
        }});
        return { id: selectedConversationId, data: response.data }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})