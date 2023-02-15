import { Seller } from "../../src/entities/seller";
import { SellerRepository } from "../../src/repositories/seller";

export class InMemorySellerRepository implements SellerRepository {
    sellers: Seller[] = [];

    async create(sale: Seller): Promise<void> {
        this.sellers.push(sale);
    }

    async findById(id: string): Promise<Seller | null> {
        const seller = this.sellers.find(item => item.id === id);

        return seller? seller: null;
    }

    async update(manager: Seller): Promise<void> {
        const seller = this.sellers.findIndex(item=> item.id === manager.id);
        this.sellers[seller] = manager;
    }

    async delete(seller: Seller): Promise<void> {
        const filteredSellers = this.sellers.filter(item=> item.id !== seller.id);

        this.sellers = filteredSellers;
    }

}