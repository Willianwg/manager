import { Manager } from "../entities/manager";
import { Seller } from "../entities/seller";

export interface ManagerRepository {
    create(manager: Manager): Promise<void>;
    findById(id: string): Promise<Manager | null>;
    update(manager: Manager): Promise<void>;
    findSeller(managerId: string, sellerId: string): Promise<Seller | null>
    findByEmail(email: string): Promise<Manager | null>
}