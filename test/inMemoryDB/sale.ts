import { Sale } from "../../src/entities/sale";
import { SaleRepository } from "../../src/repositories/sale";

export class InMemorySaleRepository implements SaleRepository {
    sales: Sale[] = [];

    async create(sale: Sale): Promise<void> {
        this.sales.push(sale);
    }

    async findById(id: string): Promise<Sale | null> {
        const sale = this.sales.find(item => item.id === id);

        return sale? sale: null;
    }

    async update(sale: Sale): Promise<void> {
        const saleIndex = this.sales.findIndex(item=> item.id === sale.id);
        this.sales[saleIndex] = sale;
    }

}