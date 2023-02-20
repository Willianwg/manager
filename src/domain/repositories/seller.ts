import { Seller } from "../entities/seller";

export interface SellerRepository {
    create(seller: Seller): Promise<void>;
    findById(id: string): Promise<Seller | null>;
    update(seller: Seller): Promise<void>;
    delete(seller: Seller): Promise<void>;
}