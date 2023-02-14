import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { SellerNotFound } from "../../src/errors/sellerNotFound";
import { RemoveSeller } from "../../src/useCases/removeSeller";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { makeSeller } from "../factories/makeSeller";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";


describe("Remove Seller", () => {
    it("Should be able to Remove a Seller from manager", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeSeller = new RemoveSeller(managerRepository, idGenerator);

        const manager = makeManager();

        const seller = makeSeller();

        manager.addSeller(seller);

        managerRepository.create(manager);

        await removeSeller.execute({
            sellerId: seller.id,
            managerId: manager.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(managerRepository.managers[0].sellers[0]).toBeFalsy();
    })

    it("Should not be able to Remove a Seller using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeSeller = new RemoveSeller(managerRepository, idGenerator);

        const manager = makeManager();

        const seller = makeSeller();

        manager.addSeller(seller);

        managerRepository.create(manager);

        expect(removeSeller.execute({
            sellerId: seller.id,
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })

    it("Should not be able to Remove a Seller using wrong Seller id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const removeSeller = new RemoveSeller(managerRepository, idGenerator);

        const manager = makeManager();

        const seller = makeSeller();

        manager.addSeller(seller);

        managerRepository.create(manager);

        expect(removeSeller.execute({
            sellerId: "wrong-id",
            managerId: manager.id,
        })).rejects.toThrow(SellerNotFound);

    })
})