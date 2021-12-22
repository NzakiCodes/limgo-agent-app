import axios from "./index";

const base = "wallet"
export class Wallet {
    static GetBalance() {
        return axios.get(`${base}/balance`);
    }
    static InterAccountTransfer(data) {
        const { amount, from, to } = data;
        return axios.post(`${base}/inter-account/transfer?amount=${amount}&from=${from}&to=${to}`);
    }

    static GetAccountInfo() {
        return axios.get(`/account-information`);
    }
}