import { PrismaClient } from "@prisma/client";
import { Product } from "../../entities/product";
import { ProductRepository } from "../../repositories/product";
import { PrismaProductMapper } from "./mappers/productMapper";


export class PrismaProductRepository implements ProductRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(Product: Product): Promise<void> {
        const raw = PrismaProductMapper.toPrisma(Product);

        await this.prisma.product.create({
            data: raw,
        })
    }

    async findById(id: string): Promise<Product | null> {
        const Product = await this.prisma.product.findFirst({
            where:{
                id
            }
        })

        if(!Product) return null;

        return PrismaProductMapper.toDomain(Product);
    }
    async update(Product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findProduct(productId: string, ProductId: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    async delete(Product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}