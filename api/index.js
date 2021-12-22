import Axios from "axios";
import { API_SERVER } from "../config/constants";

const axios = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json;charset=utf-8',
        // 'Content-Type': `multipart/form-data;`,
    },
});
export default axios;