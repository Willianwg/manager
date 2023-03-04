import { IPasswordEncoder } from "../contracts/passwordEncoder";
import { Manager } from "../entities/manager";
import { InvalidPassword } from "../errors/invalidPassword";
import { ManagerNotFound } from "../errors/managerNotFound";
import { ManagerRepository } from "../repositories/manager";

type ManagerLoginRequest = {
   email: string;
   password: string;
}

type ManagerLoginResponse = {
    manager: Manager;
}

export class ManagerLogin {
    constructor(private managerRepository: ManagerRepository, private passwordEncoder: IPasswordEncoder){}

    async execute(request:ManagerLoginRequest): Promise<ManagerLoginResponse>{
        const manager = await this.managerRepository.findByEmail(request.email);

        if(!manager){
            throw new ManagerNotFound();
        }

        const passwordMatch = this.passwordEncoder.match(request.password, manager.password);

        if(!passwordMatch){
            throw new InvalidPassword();
        }

        return {
            manager
        }
    }
}