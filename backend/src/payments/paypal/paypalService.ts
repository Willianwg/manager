import { IPayment } from "../ipayment";
import axios from "axios";

export type PaypalOrderinfo = {
    intent: "CAPTURE" | "AUTHORIZE",
    purchase_units: {
        amount: {
            value: number;
            currency_code: "BRL" | "USD"
        },
        description: string
    }[]
}

const PAYPAL_SANDBOX_URL = "https://api-m.sandbox.paypal.com";
const PAYPAL_CREATE_ORDER_PATH = "/v2/checkout/orders";
const access_token = process.env.PAYPAL_ACCESS_TOKEN;

const headers = {
    Authorization: `Bearer ${access_token}`
}

const api = axios.create({ baseURL: PAYPAL_SANDBOX_URL, headers });


export class Paypal implements IPayment<PaypalOrderinfo> {
    async createOrder(orderInfo: PaypalOrderinfo): Promise<string> {
        const response = await api.post(PAYPAL_CREATE_ORDER_PATH, orderInfo);

        console.log(response.data);

        return response.data.links[1].href;
    }
}