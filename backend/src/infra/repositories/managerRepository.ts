import { PrismaClient } from "@prisma/client";
import { Manager } from "../../domain/entities/manager";
import { Seller } from "../../domain/entities/seller";
import { ManagerRepository } from "../../domain/repositories/manager";
import { PrismaManagerMapper } from "./mappers/managerMapper";


export class PrismaManagerRepository implements ManagerRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(manager: Manager): Promise<void> {
        const raw = PrismaManagerMapper.toPrisma(manager);

        await this.prisma.manager.create({
            data: raw
        })
    }

    async findById(id: string): Promise<Manager | null> {
        const manager = await this.prisma.manager.findFirst({
            where:{
                id
            },
            include:{
                sellers: {
                    include:{
                        sales:true
                    }
                },
                products: true,
                sales: true,
            }
        })

        if(!manager) return null;

        return PrismaManagerMapper.toDomain(manager);
    }
    async update(manager: Manager): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findSeller(managerId: string, sellerId: string): Promise<Seller | null> {
        throw new Error("Method not implemented.");
    }
    
}