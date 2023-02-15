import { SellerNotFound } from "../../src/errors/sellerNotFound";
import { GetSeller } from "../../src/useCases/getSeller";
import { makeManager } from "../factories/makeManager";
import { makeSeller } from "../factories/makeSeller";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";

// https://mystore.com/:manager-short-id/:productname/:seller_id

describe("Get Seller", () => {
    it("Should be able to find a Seller", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const getSeller = new GetSeller(managerRepository);

        const newSeller = makeSeller();
        const manager = makeManager();
        manager.addSeller(newSeller);

        managerRepository.create(manager);

        const { seller } = await getSeller.execute({
            sellerId: newSeller.id,
        });

        expect(seller).toEqual(newSeller);
    })

    it("Should not be able to find a Seller using wrong id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const getSeller = new GetSeller(managerRepository);

        const newSeller = makeSeller();
        const manager = makeManager();
        manager.addSeller(newSeller);

        managerRepository.create(manager);

        expect( 
            getSeller.execute({
                sellerId: "somewrongid",
            })
        ).rejects.toThrow(SellerNotFound);
    })
})