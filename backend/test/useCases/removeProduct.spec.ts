import { ManagerNotFound } from "../../src/domain/errors/managerNotFount";
import { ProductNotFound } from "../../src/domain/errors/productNotFound";
import { RemoveProduct } from "../../src/domain/useCases/removeProduct";
import { makeManager } from "../factories/makeManager";
import { makeProduct } from "../factories/makeProduct";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { InMemoryProductRepository } from "../inMemoryDB/product";


describe("Remove Product", () => {
    it("Should be able to Remove a Product from manager", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const productRepository = new InMemoryProductRepository();
        const removeProduct = new RemoveProduct(managerRepository, productRepository);

        const manager = makeManager();
        managerRepository.create(manager);

        const product = makeProduct();
        productRepository.create(product);
        

        await removeProduct.execute({
            productId: product.id,
            managerId: manager.id,
        })

        expect(productRepository.products).toHaveLength(0);
        expect(productRepository.products[0]).toBeFalsy();
    })

    it("Should not be able to Remove a Product using wrong manager id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const productRepository = new InMemoryProductRepository();
        const removeProduct = new RemoveProduct(managerRepository, productRepository);

        const manager = makeManager();
        managerRepository.create(manager);

        const product = makeProduct();
        productRepository.create(product);

        expect(removeProduct.execute({
            productId: product.id,
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })

    it("Should not be able to Remove a Product using wrong product id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const productRepository = new InMemoryProductRepository();
        const removeProduct = new RemoveProduct(managerRepository, productRepository);

        const manager = makeManager();
        managerRepository.create(manager);

        const product = makeProduct();
        productRepository.create(product);

        expect(removeProduct.execute({
            productId: "wrong-id",
            managerId: manager.id,
        })).rejects.toThrow(ProductNotFound);

    })
})