import { Manager } from "../entities/manager";
import { Seller } from "../entities/seller";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type AddSellerRequest = {
    name: string;
    email: string;
    password: string;
    managerId: string;
}

export class AddSeller {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:AddSellerRequest){
        const manager = await this.managerRepository.findById(request.managerId);
        if(!manager){
            throw new ManagerNotFound();
        }

        const id = this.idGenerator.generate();
        const seller = new Seller({
            name: request.name,
            email: request.email,
            password: request.password,
        }, id);

        manager.addSeller(seller);

        await this.managerRepository.update(manager);

        return {
            seller,
        }
    }
}