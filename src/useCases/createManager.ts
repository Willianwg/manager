import { Manager } from "../entities/manager";
import { ManagerRepository } from "../repositories/manager";
import { IdGenerator, IdGeneratorInterface } from "../utils/idGenerator";

type CreateManagerRequest = {
    name: string;
    email: string;
    password: string;
}

export class CreateManager {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:CreateManagerRequest){
        const id = this.idGenerator.generate();
        const manager = new Manager({
            name: request.name,
            email: request.email,
            password: request.password,
        }, id);

        await this.managerRepository.create(manager);

        return {
            manager
        }
    }
}