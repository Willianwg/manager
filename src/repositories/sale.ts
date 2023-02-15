import { Sale } from "../entities/sale";

export interface SaleRepository {
    create(sale: Sale): Promise<void>;
    findById(id: string): Promise<Sale | null>;
    update(sale: Sale): Promise<void>;
}