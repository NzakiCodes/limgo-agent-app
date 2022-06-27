import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setMessage } from "./authMessage";
import { getTask} from './task'
import AuthService from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import userService from "../services/user.service";

// const userAsync = AsyncStorage.getItem("user");
// const user = userAsync != null ? userAsync : null;

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async ({}, thunkAPI) => {
        try {
            const res = await userService.getAuthUser();
            thunkAPI.dispatch(getTask())
            return { user: res.data }
        } catch (error) {
            const message =
                (
                    error.response &&
                    error.response.data &&
                    error.response.data.status
                ) || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

// Get user info Slice and reducer
const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
    },
    extraReducers: {
        [getUserInfo.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
    },
});

// const initialState = {
//     isLoggedIn: false,
//     user: null,
// };


// const initialState = {};

// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     extraReducers: {
//         [getUserInfo.fulfilled]: (state, action) => {
//             state.user = action.payload.user;
//         },
//         [getUserInfo.pending]: (state, action) => {
//             state.user = null;
//         },
//         [getUserInfo.rejected]: (state, action) => {
//             state.user = null;
//         },
//     }
// });

const { reducer } = userSlice;
export default reducer;

