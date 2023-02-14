import { Manager, ManagerProps } from "../../src/entities/manager"
import { IdGenerator } from "../../src/utils/idGenerator"

type Override = Partial<ManagerProps>

const idGenerator = new IdGenerator();

export function makeManager(override: Override = {}){
    return new Manager({
        email: "manager@email.com",
        password: "managerpass",
        name: "Manager Name",
        ...override
    }, idGenerator.generate())
}