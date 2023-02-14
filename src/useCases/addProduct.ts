import { Product } from "../entities/product";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type AddProductRequest = {
    name: string;
    price: number;
    managerId: string;
}

export class AddProduct {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:AddProductRequest){
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }

        const id = this.idGenerator.generate();
        const product = new Product({
            name: request.name,
            price: request.price,
        }, id);

        manager.addProduct(product);

        await this.managerRepository.update(manager);

        return {
            product,
        }
    }
}