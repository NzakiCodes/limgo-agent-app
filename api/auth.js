import axios from "./index";

const base = "auth";

export default class AuthApi {
    static Login = (data) => {
        return axios.post(`${base}/signin`, data);
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
    static ForgotPasswordRequest = (data) => {
        return axios.post(`${base}/forgotPassword`, data);
    }
    static ForgotPasswordVerify = (data) => {
        return axios.patch(`${base}/forgotPasswordVerify`, data);
    }
    static UpdatePassword = (data) => {
        return axios.patch(`${base}/updatePassword`, data);
    }

}