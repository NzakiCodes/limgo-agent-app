import axios from "./index";

const base = "auth";

export default class AuthApi {
    static Login = (data) => {
        return axios.post(`${base}/login`, data);
    };

    static Register = (data) => {
        return axios.post(`${base}/signup`, data);
    };

    static Logout = () => {
        return axios.post(`${base}/logout`);
    };
    static VerifyOTP = (data) => {
        return axios.patch(`${base}/verify`, data);
    }
    static ForgotPassword = (data) => {
        return axios.post(`${base}/forgotPassword`, data);
    }

}