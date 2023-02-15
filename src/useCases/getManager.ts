import { Manager } from "../entities/manager";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ManagerRepository } from "../repositories/manager";

type GetManagerRequest = {
   id: string;
}

type GetManagerResponse = {
    manager: Manager;
}

export class GetManager {
    constructor(private managerRepository: ManagerRepository){}

    async execute(request:GetManagerRequest): Promise<GetManagerResponse>{
        const manager = await this.managerRepository.findById(request.id);

        if(!manager){
            throw new ManagerNotFound();
        }

        return {
            manager
        }
    }
}