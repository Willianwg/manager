import { Seller } from "../entities/seller";
import { SellerNotFound } from "../errors/sellerNotFound";
import { SellerRepository } from "../repositories/seller";

type GetSellerRequest = {
    sellerId: string;
}

type GetSellerResponse = {
    seller: Seller;
}

export class GetSeller {
    constructor(private sellerRepository: SellerRepository){}

    async execute(request:GetSellerRequest): Promise<GetSellerResponse> {
        const { sellerId } = request;
        const seller = await this.sellerRepository.findById(sellerId);

        if(!seller){
            throw new SellerNotFound();
        }

        return {
            seller
        }
    }
}