import axios from "axios";
import authHeader from "./auth-header";
import { API_SERVER as API_URL } from "../config/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


const getAllTask = async (filter) => {
    const res = await axios.get(`${API_URL}/rider/tasks/${filter !== '' ? `?tasks=${filter}` : ''}`, {
        headers: authHeader
    });
    return res.data;
}

const getSingleTask = async (id) => {
    const res = await axios.get(`${API_URL}/rider/tasks/decline/${id}`, {
        headers: authHeader
    });
    return res.data;
}

const declineTask = async (id, reason) => {
    const res = await axios.get(`${API_URL}/rider/tasks/${id}`, {
        data: {
            note: reason
        }
    }, {
        headers: authHeader
    });
    return res.data;
}
const acceptTask = async (task_id, shipment_id) => {
    const res = await axios.get(`${API_URL}/rider/tasks/accept/${task_id}`, {
        data: {
            shipment_id:shipment_id
        }
    }, {
        headers: authHeader
    });
    return res.data;
}

const TaskService = {
    getAllTask,
    getSingleTask,
    declineTask,
    acceptTask
}

export default TaskService;