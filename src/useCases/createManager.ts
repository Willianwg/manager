import { Manager } from "../entities/manager";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type CreateManagerRequest = {
    name: string;
    email: string;
    password: string;
}

type CreateManagerResponse = {
    manager: Manager;
}

export class CreateManager {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:CreateManagerRequest): Promise<CreateManagerResponse>{
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