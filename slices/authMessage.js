import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authMessageSlice = createSlice({
    name: "authMessage",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return { message: action.payload }
        },
        clearMessage: () => {
            return { message: "" }
        }
    }
});

const { reducer, actions } = authMessageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
