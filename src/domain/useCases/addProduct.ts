import { IdGeneratorInterface } from "../contracts/IdGenerator";
import { Product } from "../entities/product";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { ProductRepository } from "../repositories/product";


type AddProductRequest = {
    name: string;
    price: number;
    managerId: string;
}

export class AddProduct {
    constructor(private managerRepository: ManagerRepository, private productRepository: ProductRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:AddProductRequest){
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }

        const id = this.idGenerator.generate();
        const product = new Product({
            name: request.name,
            price: request.price,
            managerId: request.managerId,
        }, id);

        await this.productRepository.create(product);

        return {
            product,
        }
    }
}