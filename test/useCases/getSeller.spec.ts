import { SellerNotFound } from "../../src/domain/errors/sellerNotFound";
import { GetSeller } from "../../src/domain/useCases/getSeller";
import { makeManager } from "../factories/makeManager";
import { makeSeller } from "../factories/makeSeller";
import { InMemorySellerRepository } from "../inMemoryDB/seller";

// https://mystore.com/:manager_short_id/

describe("Get Seller", () => {
    it("Should be able to find a Seller", async () => {
        const sellerRepository = new InMemorySellerRepository();
        const getSeller = new GetSeller(sellerRepository);

        const newSeller = makeSeller();

        sellerRepository.create(newSeller);

        const { seller } = await getSeller.execute({
            sellerId: newSeller.id,
        });

        expect(seller).toEqual(newSeller);
    })

    it("Should not be able to find a Seller using wrong id", async () => {
        const sellerRepository = new InMemorySellerRepository();
        const getSeller = new GetSeller(sellerRepository);

        const newSeller = makeSeller();
        const manager = makeManager();
        manager.addSeller(newSeller);

        sellerRepository.create(newSeller);

        expect( 
            getSeller.execute({
                sellerId: "somewrongid",
            })
        ).rejects.toThrow(SellerNotFound);
    })
})