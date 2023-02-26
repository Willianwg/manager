import { ManagerNotFound } from "../errors/managerNotFound";
import { SellerNotFound } from "../errors/sellerNotFound";
import { ManagerRepository } from "../repositories/manager";
import { SellerRepository } from "../repositories/seller";

type RemoveSellerRequest = {
    sellerId: string;
    managerId: string;
}

export class RemoveSeller {
    constructor(private managerRepository: ManagerRepository, private sellerRepository: SellerRepository){}

    async execute(request:RemoveSellerRequest){
        const manager = await this.managerRepository.findById(request.managerId);

        if(!manager){
            throw new ManagerNotFound();
        }

        const seller = await this.sellerRepository.findById(request.sellerId);

        if(!seller){
            throw new SellerNotFound();
        }
        
        await this.sellerRepository.delete(seller);

    }
}