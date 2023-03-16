import { Product } from "../../../domain/entities/product";
import { PaypalOrderinfo } from "../paypalService";

export class PaypalProductMapper {
    static toPaypal(product: Product): PaypalOrderinfo{
        return {
            intent: "CAPTURE",
            purchase_units:[{
                amount:{
                    currency_code: "BRL",
                    value: product.price,
                },
                description: product.name
            }]
        }
    }
}