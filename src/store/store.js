import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';
import authReducer from '../features/authSlice';
import addressReducer from "../features/addressSlice";
import websocketReducer from "features/websocketSlice";
import notificationReducer from "features/notificationSlice";
import indexedConversationReducer from "features/indexedConversationSlice";
import toastReducer from 'features/toastSlice';
import meetReducer from "features/meetSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        websocket: websocketReducer,
        notification: notificationReducer,
        users: userReducer,
        address: addressReducer,
        indexedConversations: indexedConversationReducer,
        toast: toastReducer,
        meet: meetReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) // Not recommended, maybe use Context to hold the 'stompClient' object
})