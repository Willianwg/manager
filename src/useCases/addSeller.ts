import { Seller } from "../entities/seller";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { SellerRepository } from "../repositories/seller";
import { IdGeneratorInterface } from "../utils/idGenerator";

type AddSellerRequest = {
    name: string;
    email: string;
    password: string;
    managerId: string;
}

type AddSellerResponse = {
    seller: Seller 
}

export class AddSeller {
    constructor(private managerRepository: ManagerRepository, private sellerRepository: SellerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:AddSellerRequest): Promise<AddSellerResponse> {
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }

        const id = this.idGenerator.generate();

        const seller = new Seller({
            name: request.name,
            email: request.email,
            password: request.password,
            managerId: request.managerId
        }, id);


        await this.sellerRepository.create(seller)

        return {
            seller,
        }
    }
}