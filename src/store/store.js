import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';
import authReducer from '../features/authSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer
    }
})