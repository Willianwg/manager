import { Product } from "../../domain/entities/product";

export class HttpProductMapper {
    public static toHttp(product: Product){

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            managerId: product.managerId,
            createdAt: product.createdAt,
        }
    }
}