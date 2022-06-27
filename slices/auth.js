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
      const res = await AuthService.register(email, phone_number, password);
      // thunkAPI.dispatch(setMessage(res.data.status));
      console.log(res);
      // console.log("Slice: "+res);
      return { user: res.data };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.status) ||
        error.message ||
        error.toString() ||
        error.response.data.errors.email[0] ||
        error.response.data.errors ||
        error.response.data.errors.password[0];

      console.log(error.response.data.errors.email[0]);
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDutyStatus = createAsyncThunk(
  "auth/getDutyStatus",
  async (_, thunkAPI) => {
    try {
      const res = await AuthService.fetchDutyStatus();
      // thunkAPI.dispatch(setMessage(res.data.status));
      console.log(res);
      // console.log("Slice: "+res);
      return { user: res.data };
    } catch (error) {
      // const message = error|| error.response.data.errors.email[0];
      console.log(error);
      // thunkAPI.dispatch(setMessage("message"));
      return thunkAPI.rejectWithValue("message");
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await AuthService.getAuthUser();
    console.log(res);
    console.log("res");
    return { user: res.data };
  } catch (error) {
    const token = await SecureStore.getItemAsync("token");

    // console.log(token);
    // const message = error.response.data.message;
    // console.log(error);
    thunkAPI.dispatch(setMessage("error"));
    return thunkAPI.rejectWithValue(token);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await AuthService.login(email, password);
      thunkAPI.dispatch(getUser());
      return { user: res.data };
    } catch (error) {
      const message = error.response.data.message;
      console.log(error.response);
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user, error: null }
  : { isLoggedIn: false, user: null, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.user = {
        ...state.user,
        user: {
          ...state.user.user,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
      };
    },
  },
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
    },
    [login.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [login.rejected]: (state, action, _) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [getUser.pending]: (state, action) => {
      state.user = null;
    },
    [getUser.rejected]: (state, action) => {
      // state.user = null;
    },
    [getDutyStatus.fulfilled]: (state, _) => {
      console.log(_);
    },
  },
});
export const { updateUserData } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
