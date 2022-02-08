import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setMessage } from "./authMessage";
import AuthService from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const userAsync = AsyncStorage.getItem("user");
const user = userAsync != null ? userAsync : null;

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, phone_number, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(email, phone_number, password);
            thunkAPI.dispatch(setMessage(response.data.status));
            return { user: res.data.user }
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

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await AuthService.login(email, password);
            // console.log(res.data.user)
            // const resValue = JSON.parse(res);
            // console.log(resValue)
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
export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async ({}, thunkAPI) => {
        try {
            const res = await userService.getAuthUser();
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

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
})

// const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };
const initialState = {
    isLoggedIn: SecureStore.getItemAsync("token") !== null ? true : false,
    user: {},
};

console.log(user)
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [register.pending]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            // console.log("Payload: ")
            // console.log(action.payload.user)
        },
        [login.pending]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [getUserInfo.pending]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [getUserInfo.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        }
        
    }
});

const { reducer } = authSlice;
export default reducer;
