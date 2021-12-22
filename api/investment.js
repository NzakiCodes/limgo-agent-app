import axios from "./index";

const base = "investments"
export class Investments {
    static GetBalance() {
        return axios.get(`${base}/balance`);
    }
    static GetShortActiveInvestments(data) {
        const status="active";
        return axios.get(`${base}/short?status=${status}`);
    }
    static GetLongActiveInvestments(data) {
        const { status="active", offset, limit } = data;
        return axios.post(`${base}/lomg?status=${status}&offset=${offset}&limit=${limit}`);
    }


}