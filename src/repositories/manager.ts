import { Manager } from "../entities/manager";

export interface ManagerRepository {
    create(manager: Manager): Promise<void>;
}