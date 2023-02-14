import { ManagerNotFound } from "../errors/managerNotFount";
import { SellerNotFound } from "../errors/sellerNotFound";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type RemoveSellerRequest = {
    sellerId: string;
    managerId: string;
}

export class RemoveSeller {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:RemoveSellerRequest){
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }
        
        const seller = manager.getSeller(request.sellerId);

        if(!seller){
            throw new SellerNotFound();
        }
        
        manager.removeSeller(request.sellerId);

        await this.managerRepository.update(manager);

    }
}