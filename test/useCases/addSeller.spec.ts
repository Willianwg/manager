import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { AddSeller } from "../../src/useCases/addSeller";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";


describe("Add Seller", () => {
    it("Should be able to add a Seller to manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSeller = new AddSeller(managerRepository, idGenerator);

        const manager = makeManager();

        managerRepository.create(manager);

        const { seller } = await addSeller.execute({
            email: "Seller@email.com",
            name: "Seller name",
            password: "lskdajfa",
            managerId: manager.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(managerRepository.managers[0].sellers[0]).toEqual(seller);
    })

    it("Should not be able to add a Seller using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSeller = new AddSeller(managerRepository, idGenerator);

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