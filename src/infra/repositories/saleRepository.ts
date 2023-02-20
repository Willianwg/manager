import { PrismaClient } from "@prisma/client";
import { Sale } from "../../domain/entities/sale";
import { Seller } from "../../domain/entities/seller";
import { SaleRepository } from "../../domain/repositories/sale";
import { PrismaSaleMapper } from "./mappers/saleMapper";


export class PrismaSaleRepository implements SaleRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(sale: Sale): Promise<void> {
        const raw = PrismaSaleMapper.toPrisma(sale);

        await this.prisma.sale.create({
            data: raw
        })
    }

    async findById(id: string): Promise<Sale | null> {
        const sale = await this.prisma.sale.findFirst({
            where:{
                id
            },
            include:{
                product: true,
            }
        })

        if(!sale) return null;

        return PrismaSaleMapper.toDomain(sale);
    }
    async update(Sale: Sale): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findSeller(SaleId: string, sellerId: string): Promise<Seller | null> {
        throw new Error("Method not implemented.");
    }
    
}