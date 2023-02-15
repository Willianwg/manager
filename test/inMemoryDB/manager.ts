import { Manager } from "../../src/entities/manager";
import { Seller } from "../../src/entities/seller";
import { ManagerRepository } from "../../src/repositories/manager";

export class InMemoryManagerRepository implements ManagerRepository {
    managers: Manager[] = [];

    async create(manager: Manager): Promise<void> {
        this.managers.push(manager);
    }

    async findById(id: string): Promise<Manager | null> {
        const manager = this.managers.find(item => item.id === id);

        return manager? manager: null;
    }

    async update(manager: Manager): Promise<void> {
        const managerIndex = this.managers.findIndex(item=> item.id === manager.id);
        this.managers[managerIndex] = manager;
    }

    async findSeller(sellerId: string): Promise<Seller | null> {

        const manager = this.managers.find(manager => manager.sellers.find(item=> item.id === sellerId ))

        if(!manager) return null;

        const seller = manager.sellers.find(item=> item.id === sellerId);


        return seller? seller : null;
    }

}