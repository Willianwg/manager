import { Manager } from "../../../entities/manager";
import { Manager as RawManager, Seller } from "@prisma/client";
import { PrismaSellerMapper } from "./sellerMapper";

interface ManagerRaw extends RawManager {
    sellers: Seller[];
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

        return new Manager({
            name: manager.name,
            email: manager.email,
            password: "",
            sellers: sellersList ?? [],
        }, manager.id)
    }
}