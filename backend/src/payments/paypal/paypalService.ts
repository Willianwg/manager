import { IPayment } from "../ipayment";
import axios, { Axios } from "axios";
import { randomUUID } from "crypto";

export type PaypalOrderinfo = {
    intent: "CAPTURE" | "AUTHORIZE",
    purchase_units: {
        amount: {
            value: number;
            currency_code: "BRL" | "USD"
        },
        description: string
    }[];
    payment_source: {
        paypal: {
            experience_context: {
                return_url: string;
                cancel_url: string;
                landing_page: "LOGIN" | "GUEST_CHECKOUT";
                user_action?: "PAY_NOW" | "CONTINUE"
            }
        }
    }
}

const PAYPAL_SANDBOX_URL = "https://api-m.sandbox.paypal.com";
const PAYPAL_CREATE_ORDER_PATH = "/v2/checkout/orders";

export class Paypal implements IPayment<PaypalOrderinfo> {
    private api: Axios;

    constructor() {
        this.api = axios.create({
            baseURL: PAYPAL_SANDBOX_URL, headers: {
                Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`
            }
        });
    }
    async createOrder(orderInfo: PaypalOrderinfo): Promise<string> {
        try {
            const response = await this.api.post(PAYPAL_CREATE_ORDER_PATH, orderInfo, {
                headers: {
                    "PayPal-Request-Id": randomUUID(),
                }
            });

            console.log(response.data);

            return response.data.links[1].href;
        }
        catch (err) {
            return 'Fail'
        }
    }
}