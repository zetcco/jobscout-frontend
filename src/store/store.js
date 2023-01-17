import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';

export default configureStore({
    reducer: {
        users: userReducer
    }
})