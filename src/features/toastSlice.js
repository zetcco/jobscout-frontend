import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    message: "",
    severity: "info"
}

const toastSlice = createSlice({
    name: 'toast',
    initialState, 
    reducers: {
        setToastMessage(state, action) {
            state.isOpen = true
            state.message = action.payload.message
            state.severity = action.payload.severity ? action.payload.severity : "info"
        },
        clearToast(state, _) {
            state.isOpen = false
        }
    }
})

export const selectToast = (state) => state.toast;

export default toastSlice.reducer;
export const { setToastMessage, clearToast } = toastSlice.actions;