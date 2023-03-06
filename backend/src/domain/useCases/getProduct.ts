import { Product } from "../entities/product";
import { ProductNotFound } from "../errors/productNotFound";
import { ProductRepository } from "../repositories/product";

type GetProductRequest = {
   productId: string;
}

type GetProductResponse = {
    product: Product;
}

export class GetProduct {
    constructor(private productRepository: ProductRepository){}

    async execute(request:GetProductRequest): Promise<GetProductResponse>{
        const product = await this.productRepository.findById(request.productId);

        if(!product){
            throw new ProductNotFound();
        }

        return {
            product
        }
    }
}