import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { AddProduct } from "../../src/useCases/addProduct";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";


describe("Add Product", () => {
    it("Should be able to add a Product to manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addProduct = new AddProduct(managerRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        const { product } = await addProduct.execute({
            price:599,
            name: "Random product",
            managerId: manager.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0].products[0]).toEqual(product);
    })

    it("Should not be able to add a Product to non existing manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addProduct = new AddProduct(managerRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        expect(addProduct.execute({
            price:599,
            name: "Random product",
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })
})