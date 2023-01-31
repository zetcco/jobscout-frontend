import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';
import authReducer from '../features/authSlice';
import addressReducer from "../features/addressSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        address: addressReducer
    }
})