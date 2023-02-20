import { Product } from "../../../domain/entities/product";
import { Product as Rawproduct } from "@prisma/client";

export class PrismaProductMapper {
    static toPrisma(product: Product){
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            managerId: product.managerId,
        }
    }

    static toDomain(product: Rawproduct){
        return new Product({
            name: product.name,
            price: Number(product.price),
            managerId: product.managerId,
        }, product.id)
    }
}