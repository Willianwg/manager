import { Product } from "../../src/domain/entities/product";
import { ProductRepository } from "../../src/domain/repositories/product";

export class InMemoryProductRepository implements ProductRepository {
    products: Product[] = [];

    async create(sale: Product): Promise<void> {
        this.products.push(sale);
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.products.find(item => item.id === id);

        return product? product: null;
    }

    async update(product: Product): Promise<void> {
        const productIndex = this.products.findIndex(item=> item.id === product.id);
        this.products[productIndex] = product;
    }

    async delete(product: Product): Promise<void> {
        const filteredProducts = this.products.filter(item=> item.id !== product.id);

        this.products = filteredProducts;
    }

}