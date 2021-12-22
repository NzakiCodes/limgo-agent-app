import axios from "./index";

const base = "notifications"
export class Notifications {
    static GetNotifications() {
        return axios.get(`${base}`);
    }
    static ShowNotificationById(id) {
        return axios.get(`${base}/${id}/show`);
    }
    static ReadAllNotifications() {
        return axios.get(`${base}/read-all`);
    }

}