import { Manager } from "../../../entities/manager";
import { Manager as RawManager, Product, Seller } from "@prisma/client";
import { PrismaSellerMapper } from "./sellerMapper";
import { PrismaProductMapper } from "./productMapper";

interface ManagerRaw extends RawManager {
    sellers: Seller[];
    products: Product[];
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

        return new Manager({
            name: manager.name,
            email: manager.email,
            password: "",
            sellers: sellersList,
            products: productsList,
        }, manager.id)
    }
}