import { Manager } from "../../src/entities/manager";
import { ManagerRepository } from "../../src/repositories/manager";


export class InMemoryManagerRepository implements ManagerRepository {
    managers: Manager[] = [];

    async create(manager: Manager): Promise<void> {
        this.managers.push(manager);
    }

}