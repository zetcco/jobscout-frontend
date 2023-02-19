import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';
import authReducer from '../features/authSlice';
import addressReducer from "../features/addressSlice";
import websocketReducer from "features/websocketSlice";
import notificationReducer from "features/notificationSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        websocket: websocketReducer,
        notification: notificationReducer,
        users: userReducer,
        address: addressReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) // Not recommended, maybe use Context to hold the 'stompClient' object
})