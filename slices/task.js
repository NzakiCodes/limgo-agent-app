import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./authMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskService from "../services/task.service";
const userAsync = AsyncStorage.getItem("user");
const user = userAsync != null ? userAsync : null;


export const getTask = createAsyncThunk(
    "task/getTask",
    async ({ filter }, thunkAPI) => {
        try {
            const res = await TaskService.getAllTask(filter);
            console.log(res.data)
            return { task: res.data }
        } catch (error) {
            // const message = error.response.data.message;
            console.log(error);
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const initialState = {
    task:{}
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    extraReducers: {
        [getTask.fulfilled]: (state, action) => {
            state.task = action.payload.task;
        },
        [getTask.pending]: (state, action) => {
            state.task = null;
        },
        [getTask.rejected]: (state, action, _) => {
            state.task = null;
        },
    }
});

const { reducer } = taskSlice;
export default reducer;

