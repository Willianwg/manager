import { Sale } from "../../../domain/entities/sale";
import { Sale as RawSale, Product } from "@prisma/client";
import { PrismaProductMapper } from "./productMapper";

interface SaleRaw extends RawSale {
    product: Product;
}

export class PrismaSaleMapper {
    static toPrisma(sale: Sale){
        return {
            id: sale.id,
            productId: sale.soldProduct.id,
            value: sale.price,
            createdAt: sale.createdAt,
            managerId: sale.managerId,
            sellerId: sale.soldBy,
        }
    }

    static toDomain(sale: SaleRaw){
        const product = PrismaProductMapper.toDomain(sale.product);

        return new Sale({
            value: product.price,
            sellerId: sale.sellerId,
            managerId: sale.managerId,
            product,
            createdAt: sale.createdAt,
        }, sale.id)
    }
}