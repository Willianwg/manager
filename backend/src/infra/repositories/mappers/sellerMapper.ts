import { Seller } from "../../../domain/entities/seller";
import { Sale as RawSale, Seller as RawSeller } from "@prisma/client";
import { Sale } from "../../../domain/entities/sale";

interface SellerRaw extends RawSeller {
    sales?: RawSale[]
}

export class PrismaSellerMapper {
    static toPrisma(seller: Seller) {
        return {
            id: seller.id,
            name: seller.name,
            email: seller.email,
            password: seller.password,
            managerId: seller.managerId
        }
    }

    static toDomain(seller: SellerRaw) {

        return new Seller({
            name: seller.name,
            email: seller.email,
            password: "",
            managerId: seller.managerId ?? "",
            sales: seller.sales ? getSales(seller.sales) : undefined,
        }, seller.id)
    }
}

function getSales(sales: RawSale[]) {

    return sales.map(item => {
        return new Sale({
            managerId: item.managerId,
            sellerId: item.sellerId,
            product: {
                id: item.productId,
            },
            value: Number(item.value),
            createdAt: item.createdAt,
        }, item.id)
    });

}