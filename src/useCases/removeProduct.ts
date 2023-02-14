import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type RemoveProductRequest = {
    productId: string;
    managerId: string;
}

export class RemoveProduct {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:RemoveProductRequest){
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }
        
        manager.removeProduct(request.productId);

        await this.managerRepository.update(manager);

    }
}