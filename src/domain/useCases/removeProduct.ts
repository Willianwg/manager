import { ManagerNotFound } from "../errors/managerNotFount";
import { ProductNotFound } from "../errors/productNotFound";
import { ManagerRepository } from "../repositories/manager";
import { ProductRepository } from "../repositories/product";

type RemoveProductRequest = {
    productId: string;
    managerId: string;
}

export class RemoveProduct {
    constructor(private managerRepository: ManagerRepository, private productRepository: ProductRepository){}

    async execute(request:RemoveProductRequest){
        const manager = await this.managerRepository.findById(request.managerId);

        if(!manager){
            throw new ManagerNotFound();
        }

        const product = await this.productRepository.findById(request.productId);

        if(!product){
            throw new ProductNotFound();
        }
        
        await this.productRepository.delete(product);

    }
}