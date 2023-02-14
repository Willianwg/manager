import { Manager, ManagerProps } from "../../src/entities/manager";
import { IdGenerator } from "../../src/utils/idGenerator";

type Override = Partial<ManagerProps>

const idGenerator = new IdGenerator();

export function makeManager(override: Override = {}, id?:string){
    const _id = id ?? idGenerator.generate();
    
    return new Manager({
        email: "manager@email.com",
        password: "managerpass",
        name: "Manager Name",
        ...override
    }, _id)
}