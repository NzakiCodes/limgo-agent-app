import axios from "./index";

const base = "products"
export class Products {
    static GetAll() {
        return axios.get(`${base}`);
    }
    static GetById(product_id) {
        return axios.get(`${base}/show/${product_id}`);
    }

    static GetByCategory(category_id) {
        return axios.get(`${base}/category/${category_id}`);
    }

    static GetBySubCategory(sub_category_id) {
        return axios.get(`${base}/subcategory/${sub_category_id}`);
    }
    static GetDeals(){
        return axios.get(`${base}/deals`)
    }
}