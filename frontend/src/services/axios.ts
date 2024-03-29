import { ProductProps } from "@/pages/Dashboard";
import axios from "axios"
import { backUrl } from "backUrl"

type RegisterSellerDto = {
    managerId: string;
    email: string;
    password: string;
    name: string;
}

const api = axios.create({
    baseURL: backUrl,
})

export const useApi = () => ({
    async hello(product: ProductProps) {
        const response = await api.get("/sale/" + product.id);

        return response.data;
    },

    async getManager() {
        const managerId = "35b83df2-3b25-41c6-9bce-dd50bf947b24";
        const response = await api.get("/manager/" + managerId);

        return response.data;

    },

    async getProduct(productId: string) {
        try {
            const response = await api.get("/product/" + productId);
            return response.data;
        } catch {
            return null;
        }


    },

    async registerSeller(sellerInfo: RegisterSellerDto) {
        const response = await api.post("/seller", sellerInfo);

        return response.status;
    },

    async createOrder(productId: string) {
        const response = await api.post(`/${productId}/new-order`);

        return response.data;
    },

    async saveSale(saleInfo: { sellerId: string, productId: string }) {
        const response = await api.post("/sale", {
            managerId: "bc86084f-40e8-495c-8c07-e594c4fbd6f3",
            sellerId: saleInfo.sellerId,
            productId: saleInfo.productId,
        })

        console.log(response.data);

        return saleInfo;
    },

    async login(email: string, password: string) {

        return {
            name: "RandomName",
            id: "askdjfsakdfjlasfkasdafas",
            access_token: "HASDIUPFHSPADIFHPAS1234AD_FAFA"
        }
    },

    async authenticate(access_token: string) {
        return {
            manager: {
                name: "RandomName",
                id: "askdjfsakdfjlasfkasdafas",
            }
        }
    }
})