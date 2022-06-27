import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import authMessageReducer from "../slices/authMessage";
import userReducer from "../slices/user";
import taskReducer from "../slices/task";


const reducer = {
    auth: authReducer,
    authMessage: authMessageReducer,
    task: taskReducer,
    // user: userReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools:true
});

export default store;