import { ProductProps } from "@/pages/Dashboard";
import axios from "axios"
import { backUrl } from "backUrl"

const api = axios.create({
    baseURL: backUrl,
})

export const useApi = ()=>({
    async hello(product: ProductProps){
        const response = await api.get("/sale/"+ product.id);

        return response.data;
    },

    async getManager(){
        const managerId = "bc86084f-40e8-495c-8c07-e594c4fbd6f3";
        const response = await api.get("/manager/"+managerId);

        return response.data;

    },

    async getProduct(productId: string){
        try {
            const response = await api.get("/product/" + productId);
            return response.data;
        } catch {
            return null;
        }

       
    }
})