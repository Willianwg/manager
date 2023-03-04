import { Manager } from "../../../domain/entities/manager";
import { Manager as RawManager, Product, Sale as RawSale, Seller } from "@prisma/client";
import { PrismaSellerMapper } from "./sellerMapper";
import { PrismaProductMapper } from "./productMapper";
import { Sale } from "../../../domain/entities/sale";

interface ManagerRaw extends RawManager {
    sellers: Seller[];
    products: Product[];
    sales: RawSale[];
}

export class PrismaManagerMapper {
    static toPrisma(manager: Manager){
        return {
            id: manager.id,
            name: manager.name,
            email: manager.email,
            password: manager.password
        }
    }

    static toDomain(manager: ManagerRaw){
        const sellersList = manager.sellers.map(PrismaSellerMapper.toDomain);
        const productsList = manager.products.map(PrismaProductMapper.toDomain);
        
        const salesList = manager.sales.map(item => {
            return new Sale({
                managerId: item.managerId,
                sellerId: item.sellerId,
                product:{
                    id: item.productId,
                },
                value: Number(item.value),
                createdAt: item.createdAt,
            }, item.id)
        });

        return new Manager({
            name: manager.name,
            email: manager.email,
            password: manager.password,
            sellers: sellersList,
            products: productsList,
            sales: salesList,
        }, manager.id)
    }
}