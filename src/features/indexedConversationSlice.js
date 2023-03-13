import axios from "axios";
import { sendSignal } from "./websocketSlice";

const { createEntityAdapter, createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const conversationAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        if (a.messages.length === 0)
            return 0
        return b.messages[0]?.timestamp.localeCompare(a.messages[0]?.timestamp)
    }
})

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
            const index = state.ids.indexOf(action.payload.conversationId)
            state.ids.splice(index, 1);
            state.ids.unshift(action.payload.conversationId)
        },
        isTyping: (state, action) => {
            state.entities[action.payload.conversationId].typing = action.payload.name
        },
        stopTyping: (state, action) => {
            state.entities[action.payload.conversationId].typing = null
        },
        updateConversation: (state, action) => {
            const { name, picture } = action.payload
            state.entities[action.payload.id].name = name
            state.entities[action.payload.id].picture = picture
        },
        setSubscribeToConversation: (state, action) => {
            state.subscribed = true
        },
        setUnsubscribeToConversation: (state, action) => {
            state.subscribed = false
        },
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
                if (state.entities[action.payload.id].page === 0)
                    state.entities[action.payload.id].messages = action.payload.data.slice().reverse()
                else 
                    state.entities[action.payload.id].messages = [ ...action.payload.data.slice().reverse(), ...state.entities[action.payload.id].messages ]
                state.messageLoading = false
                state.entities[action.payload.id].page += 1
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

export const { 
    setNewConversation, 
    messageRecieved,
    isTyping,
    stopTyping,
    updateConversation,
    setSubscribeToConversation,
    setUnsubscribeToConversation
} = conversationSlice.actions;

export const selectMessagesIndexed = (state, conversationId) => state.indexedConversations.entities[conversationId]?.messages
export const selectParticipants = (state, conversationId) => state.indexedConversations.entities[conversationId]?.participants
export const selectMessagesLoading = (state) => state.indexedConversations.messageLoading;
export const selectConversationLoading = (state) => state.indexedConversations.conversationLoading;
export const selectConversationError = (state) => state.indexedConversations.conversationError;
export const selectConversationPage = (state, conversationId) => state.indexedConversations.entities[conversationId]?.page
export const selectTyping = (state, conversationId) => state.indexedConversations.entities[conversationId]?.typing
export const selectAllConversations = (state) => state.indexedConversations.entities

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

export const fetchConversationMessagesIndexed = createAsyncThunk('indexedConversations/fetchMessages', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState()
        const response = await axios.get(`/messaging/${id}?page=${state.indexedConversations.entities[id].page}&count=25`, { headers: {
            "Authorization": `Bearer ${state.auth.token}`
        }});
        return { id: id, data: response.data }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
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

export const subsribeToServerPrivateMessage = (dispatch, getState) => {
    const state = getState();
    if (!state.indexedConversations.subscribed) {
        if (state.auth.token != null) {
            state.websocket.stompClient.subscribe(
                `/messaging/private/${state.auth.userInfo.id}`,
                (payload) => {
                    const body = JSON.parse(payload.body)
                    const data = JSON.parse(body.data)
                    switch (body.type) {
                        case "MESSAGE":
                            dispatch(messageRecieved(data)) // From new conversation
                            break;
                        case "TYPING":
                            dispatch(isTyping(data))
                            break;
                        case "CONVERSATION":
                            dispatch(setNewConversation(data)) // From new conversation
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