import axios from "axios"
import { backUrl } from "backUrl"

const api = axios.create({
    baseURL: backUrl,
})

export const useApi = ()=>({
    async hello(){
        const response = await api.get("/");

        return response.data;
    }
})