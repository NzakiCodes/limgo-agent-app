import axios from "axios";
import authHeader from "./auth-header";
import { API_SERVER as API_URL } from "../config/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';



const getAuthUser = () => {
    return axios.get(`${API_URL}/auth`, { headers: authHeader });
};

const changePassword = (old_password, password, password_confirmation) => {
    return axios.get(`${API_URL}/auth`,
        {
            data:
            {
                old_password,
                password,
                password_confirmation,
            }
        },
        {
            headers: authHeader
        });

}
const verifyPhone = async (code) => {
    const user_id = JSON.parse(AsyncStorage.getItem("user"));
console.log(user_id);
    const response = await axios
        .post(`${API_URL}/auth/verify-phone`, {
            data:
            {
                user_id:user_id.user.id,
                code
            }
        },
            {
                headers: authHeader
            });
    return response.data;
};
const userService = {
    getAuthUser,
    changePassword,
    verifyPhone
};

export default userService;
