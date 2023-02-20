import { ManagerNotFound } from "../../src/domain/errors/managerNotFount";
import { SellerNotFound } from "../../src/domain/errors/sellerNotFound";
import { RemoveSeller } from "../../src/domain/useCases/removeSeller";
import { makeManager } from "../factories/makeManager";
import { makeSeller } from "../factories/makeSeller";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { InMemorySellerRepository } from "../inMemoryDB/seller";


describe("Remove Seller", () => {
    it("Should be able to Remove a Seller from manager", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const sellerRepository = new InMemorySellerRepository();
        const removeSeller = new RemoveSeller(managerRepository, sellerRepository);

        const manager = makeManager();

        const seller = makeSeller({
            managerId: manager.id
        });

        managerRepository.create(manager);

        sellerRepository.create(seller);

        await removeSeller.execute({
            sellerId: seller.id,
            managerId: manager.id,
        })

        expect(sellerRepository.sellers[0]).toBeFalsy();
    })

    it("Should not be able to Remove a Seller using wrong manager id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const sellerRepository = new InMemorySellerRepository();
        const removeSeller = new RemoveSeller(managerRepository, sellerRepository);

        const manager = makeManager();

        const seller = makeSeller({
            managerId: manager.id
        });

        managerRepository.create(manager);

        sellerRepository.create(seller);

        expect(removeSeller.execute({
            sellerId: seller.id,
            managerId: "wrong-id",
        })).rejects.toThrow(ManagerNotFound);

    })

    it("Should not be able to Remove a Seller using wrong Seller id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const sellerRepository = new InMemorySellerRepository();
        const removeSeller = new RemoveSeller(managerRepository, sellerRepository);

        const manager = makeManager();

        const seller = makeSeller({
            managerId: manager.id
        });

        managerRepository.create(manager);

        sellerRepository.create(seller);

        expect(removeSeller.execute({
            sellerId: "wrong-id",
            managerId: manager.id,
        })).rejects.toThrow(SellerNotFound);

    })
})