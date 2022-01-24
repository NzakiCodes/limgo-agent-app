import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userDetails:
    {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    }
};

export const authSlice = createSlice({
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.token = action.payload.token;
            SecureStore.setItemAsync('userToken', action.payload.token);
        },
        signout: () => {
            state.token = action.payload.token;
            SecureStore.deleteItemAsync('userToken');
        }
    }
});

export const { signIn, signout } = authSlice.actions;
export default authSlice.reducer;