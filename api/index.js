import Axios from "axios";
import { API_SERVER } from "../config/constants";
import * as SecureStore from 'expo-secure-store';





const axios = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json;charset=utf-8',
        // 'Content-Type': `multipart/form-data;`,
        // "x-access-token": 
    },
});

/* 
// @Request Interceptor
axios.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("userToken");
        if (config.url.includes("/signin")) return config;
        // if (config.url.includes("/refresh")) return config;
        // TokenValidate();
        config.headers["x-access-token"] = `${token}`;
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// @Response Interceptor
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const request = error.config;
        const token = await SecureStore.getItemAsync("userToken");
        if (error?.response?.status == 401 && !request._retry) {
            request._retry = true;
            config.headers["x-access-token"] = `${token}`;
            config.headers["Content-Type"] = "application/json";
            return axios(request);
        }
        return Promise.reject();
    }
)

 */

export default axios;