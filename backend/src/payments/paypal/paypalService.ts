import { IPayment } from "../ipayment";

type PaypalOrderinfo = {
    intent: "CAPTURE" | "AUTHORIZE",
    purchase_units: {
        amount: {
            value: number;
            currency_code: "BRL" | "USD"
        },
        description: string
    }[]
}

export class Paypal implements IPayment<PaypalOrderinfo> {
    async createOrder(orderInfo: PaypalOrderinfo): Promise<string> {
        return orderInfo.purchase_units[0].description;
    }
}