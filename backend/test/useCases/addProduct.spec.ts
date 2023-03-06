import { ManagerNotFound } from "../../src/domain/errors/managerNotFound";
import { AddProduct } from "../../src/domain/useCases/addProduct";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { InMemoryProductRepository } from "../inMemoryDB/product";


describe("Add Product", () => {
    it("Should be able to add a Product", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const productRepository = new InMemoryProductRepository();

        const addProduct = new AddProduct(managerRepository, productRepository, idGenerator);

        const manager = makeManager();
        managerRepository.create(manager);

        const { product } = await addProduct.execute({
            price:599,
            name: "Random product",
            managerId: manager.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(productRepository.products[0]).toEqual(product);
        expect(product.managerId).toEqual(manager.id);
    })

    it("Should not be able to add a Product using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const productRepository = new InMemoryProductRepository();

        const addProduct = new AddProduct(managerRepository, productRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        expect(addProduct.execute({
            price:599,
            name: "Random product",
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })
})