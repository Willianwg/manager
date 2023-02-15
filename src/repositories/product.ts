import { Product } from "../entities/product";

export interface ProductRepository {
    create(product: Product): Promise<void>;
    findById(id: string): Promise<Product | null>;
    update(product: Product): Promise<void>;
    delete(product: Product): Promise<void>;
}