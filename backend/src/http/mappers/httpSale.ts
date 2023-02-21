import { Sale } from "../../domain/entities/sale";

export class HttpSaleMapper {
    public static toHttp(sale: Sale){

        return {
            id: sale.id,
            productId: sale.soldProduct.id,
            sellerId: sale.soldBy,
            createdAt: sale.createdAt,
            value: sale.price
        }
    }
}