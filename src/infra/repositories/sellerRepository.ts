import { PrismaClient } from "@prisma/client";
import { Seller } from "../../entities/seller";
import { SellerRepository } from "../../repositories/seller";
import { PrismaSellerMapper } from "./mappers/sellerMapper";


export class PrismaSellerRepository implements SellerRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(seller: Seller): Promise<void> {
        const raw = PrismaSellerMapper.toPrisma(seller);

        const { managerId } = raw;

        await this.prisma.seller.create({
            data: raw,
        })
    }

    async findById(id: string): Promise<Seller | null> {
        const seller = await this.prisma.seller.findFirst({
            where:{
                id
            }
        })

        if(!seller) return null;

        return PrismaSellerMapper.toDomain(seller);
    }
    async update(Seller: Seller): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findSeller(SellerId: string, sellerId: string): Promise<Seller | null> {
        throw new Error("Method not implemented.");
    }
    async delete(seller: Seller): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}