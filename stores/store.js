import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import authMessageReducer from "../slices/authMessage";
import userReducer from "../slices/user";


const reducer = {
    auth: authReducer,
    authMessage: authMessageReducer,
    // user: userReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools:true
});

export default store;