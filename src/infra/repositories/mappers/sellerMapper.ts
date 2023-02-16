import { Seller } from "../../../entities/seller";
import { Seller as RawSeller } from "@prisma/client";

export class PrismaSellerMapper {
    static toPrisma(seller: Seller){
        return {
            id: seller.id,
            name: seller.name,
            email: seller.email,
            password: seller.password,
            managerId: seller.managerId
        }
    }

    static toDomain(seller: RawSeller){
        return new Seller({
            name: seller.name,
            email: seller.email,
            password: "",
            managerId: seller.managerId ?? "",
        }, seller.id)
    }
}