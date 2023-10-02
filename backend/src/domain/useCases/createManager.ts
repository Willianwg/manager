import { IdGeneratorInterface } from "../contracts/IdGenerator";
import { Manager } from "../entities/manager";
import { ManagerRepository } from "../repositories/manager";

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
        const exists = await this.managerRepository.findByEmail(request.email)
        if(exists){
            throw new Error("Email not available")
        }
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