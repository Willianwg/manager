import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { AddSeller } from "../../src/useCases/addSeller";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { InMemorySellerRepository } from "../inMemoryDB/seller";


describe("Add Seller", () => {
    it("Should be able to add a Seller to manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const sellerRepository = new InMemorySellerRepository();
        const addSeller = new AddSeller(managerRepository, sellerRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        const { seller } = await addSeller.execute({
            email: "Seller@email.com",
            name: "Seller name",
            password: "lskdajfa",
            managerId: manager.id,
        })

        expect(seller.managerId).toEqual(manager.id);
    })

    it("Should not be able to add a Seller using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const sellerRepository = new InMemorySellerRepository();
        const addSeller = new AddSeller(managerRepository, sellerRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        expect(addSeller.execute({
            email: "Seller@email.com",
            name: "Seller name",
            password: "lskdajfa",
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })
})