import { Seller } from "../../domain/entities/seller";

export class HttpSellerMapper {
    public static toHttp(seller: Seller){

        return {
            id: seller.id,
            name: seller.name,
            email: seller.email,
        }
    }
}