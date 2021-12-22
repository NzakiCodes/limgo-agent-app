import axios from "./index";

const base = "cart"
export class Cart {
    static GetCartItems() {
        return axios.get(`${base}`);
    }
    static AddToCart(product_id) {
        return axios.post(`${base}/add/${product_id}`);
    }

    static RemoveFromCart(product_id) {
        return axios.delete(`${base}/remove/${product_id}`);
    }

    static ClearCart() {
        return axios.put(`${base}/clear`);
    }
}