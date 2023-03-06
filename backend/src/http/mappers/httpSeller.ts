import { Seller } from "../../domain/entities/seller";
import { HttpSaleMapper } from "./httpSale";

export class HttpSellerMapper {
    public static toHttp(seller: Seller){

        return {
            id: seller.id,
            name: seller.name,
            email: seller.email,
            sales: seller.sales.map(HttpSaleMapper.toHttp)
        }
    }
}