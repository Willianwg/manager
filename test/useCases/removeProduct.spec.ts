import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { ProductNotFound } from "../../src/errors/productNotFound";
import { RemoveProduct } from "../../src/useCases/removeProduct";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { makeProduct } from "../factories/makeProduct";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";


describe("Remove Product", () => {
    it("Should be able to Remove a Product from manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeProduct = new RemoveProduct(managerRepository, idGenerator);

        const manager = makeManager();

        const product = makeProduct();

        manager.addProduct(product);

        managerRepository.create(manager);

        await removeProduct.execute({
            productId: product.id,
            managerId: manager.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(managerRepository.managers[0].products[0]).toBeFalsy();
    })

    it("Should not be able to Remove a Product using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeProduct = new RemoveProduct(managerRepository, idGenerator);

        const manager = makeManager();

        const product = makeProduct();

        manager.addProduct(product);

        managerRepository.create(manager);

        expect(removeProduct.execute({
            productId: product.id,
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })

    it("Should not be able to Remove a Product using wrong product id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeProduct = new RemoveProduct(managerRepository, idGenerator);

        const manager = makeManager();

        const product = makeProduct();

        manager.addProduct(product);

        managerRepository.create(manager);

        expect(removeProduct.execute({
            productId: "wrong-id",
            managerId: manager.id,
        })).rejects.toThrow(ProductNotFound);

    })
})