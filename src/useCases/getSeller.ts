import { Seller } from "../entities/seller";
import { SellerNotFound } from "../errors/sellerNotFound";
import { ManagerRepository } from "../repositories/manager";

type GetSellerRequest = {
    sellerId: string;
}

type GetSellerResponse = {
    seller: Seller;
}

export class GetSeller {
    constructor(private managerRepository: ManagerRepository){}

    async execute(request:GetSellerRequest): Promise<GetSellerResponse> {
        const seller = await this.managerRepository.findSeller(request.sellerId);

        if(!seller){
            throw new SellerNotFound();
        }

        return {
            seller
        }
    }
}