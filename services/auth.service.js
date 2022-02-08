import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { API_SERVER as API_URL } from "../config/constants";

const register = async (email, phone_number, password) => {
    const response = await axios
        .post(`${API_URL}/auth/vendor-signup`, { email, phone_number, password }, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        
    if (response.data.token) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        SecureStore.setItemAsync("token", response.data.token);
        SecureStore.setItemAsync("user_id", response.data.user.id);
    }
    console.log("Server:" +response);
    return response.data;
}

const login = async (email, password) => {
    const response = await axios
        .post(`${API_URL}/auth/login`, { email, password }, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log("Server"+response.data);
    if (response.data.token) {
        console.log("Server"+response.data);
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        SecureStore.setItemAsync("token", response.data.token);
    }
    return response.data;
};


// Logout user
const logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user_id");
    const response = await axios
    .post(`${API_URL}/auth/logout`, { }, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + await SecureStore.getItemAsync("token")
        }
    });
    return axios.post(`${API_URL}/auth/logout`);
};

// update user Profile
const updateProfile = async (user_id, name, email, phone_number, password, password_confirmation) => {
    const response = await axios
        .post(`${API_URL}/auth/update-profile`, { user_id, name, email, phone_number, password, password_confirmation }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + await SecureStore.getItemAsync("token")
            }
        });
    return response.data;
};
// Change password
const changePassword = async (old_password, password, password_confirmation) => {
    const response = await axios
        .post(`${API_URL}/auth/change-password`, { old_password, password, password_confirmation }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + await SecureStore.getItemAsync("token")
            }
        });
    return response.data;
};

// Forgot Password
const forgotPassword = async (email) => {
    const response = await axios
        .post(`${API_URL}/auth/forgot-password`, { email }, {
            headers: {
                'Accept': 'application/json'
            }
        });
    return response.data;
};



const logout = async () => {
   await AsyncStorage.removeItem("user");
   await SecureStore.deleteItemAsync("token");
    return axios.post(`${API_URL}/auth/logout`);
}

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    changePassword,
}

export default authService;
