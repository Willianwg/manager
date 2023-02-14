import { Manager } from "../entities/manager";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";
import { IdGenerator, IdGeneratorInterface } from "../utils/idGenerator";

type GetManagerRequest = {
   id: string;
}

export class GetManager {
    constructor(private managerRepository: ManagerRepository){}

    async execute(request:GetManagerRequest){
        const manager = await this.managerRepository.findById(request.id);

        if(!manager){
            throw new ManagerNotFound();
        }

        return {
            manager
        }
    }
}