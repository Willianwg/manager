import { ManagerNotFound } from "../../src/errors/managerNotFount";
import { ProductNotFound } from "../../src/errors/productNotFound";
import { SellerNotFound } from "../../src/errors/sellerNotFound";
import { AddSale } from "../../src/useCases/addSale";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { makeProduct } from "../factories/makeProduct";
import { makeSeller } from "../factories/makeSeller";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";


describe("Add Seller", () => {
    it("Should be able to add a Sale to manager and Seller", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSeller = new AddSale(managerRepository, idGenerator);

        const manager = makeManager();
        const sellerOne = makeSeller();
        const sellerTwo = makeSeller();
        const product = makeProduct();

        manager.addSeller(sellerOne);
        manager.addSeller(sellerTwo);
        manager.addProduct(product);

        managerRepository.create(manager);

        const saleOne  = await addSeller.execute({
            managerId: manager.id,
            sellerId: sellerOne.id,
            productId: product.id,
        })

        const saleTwo  = await addSeller.execute({
            managerId: manager.id,
            sellerId: sellerTwo.id,
            productId: product.id,
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
        expect(managerRepository.managers[0].products[0]).toEqual(product);
        expect(managerRepository.managers[0].sellers[0]).toEqual(sellerOne);
        expect(managerRepository.managers[0].sellers[0].sales[0]).toEqual(saleOne.sale);
        expect(managerRepository.managers[0].sellers[1]).toEqual(sellerTwo);
        expect(managerRepository.managers[0].sellers[1].sales[0]).toEqual(saleTwo.sale);
        expect(managerRepository.managers[0].sellers[0].sales[0]).toEqual(managerRepository.managers[0].sales[0]);
        expect(managerRepository.managers[0].sellers[1].sales[0]).toEqual(managerRepository.managers[0].sales[1]);

    })

    it("Should not be able to add a Seller using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSale = new AddSale(managerRepository, idGenerator);

        const manager = makeManager();
        const seller = makeSeller();
        const product = makeProduct();

        manager.addSeller(seller);
        manager.addProduct(product);

        managerRepository.create(manager);

        expect(addSale.execute({
            managerId: "wrong-id",
            sellerId: seller.id,
            productId: product.id,
        })).rejects.toThrow(ManagerNotFound);

    })

    it("Should not be able to add a Seller using wrong seller id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSale = new AddSale(managerRepository, idGenerator);

        const manager = makeManager();
        const seller = makeSeller();
        const product = makeProduct();

        manager.addSeller(seller);
        manager.addProduct(product);

        managerRepository.create(manager);

        expect(addSale.execute({
            managerId: manager.id,
            sellerId: "wrong-id",
            productId: product.id,
        })).rejects.toThrow(SellerNotFound);

    })

    it("Should not be able to add a Seller using wrong product id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const addSale = new AddSale(managerRepository, idGenerator);

        const manager = makeManager();
        const seller = makeSeller();
        const product = makeProduct();

        manager.addSeller(seller);
        manager.addProduct(product);

        managerRepository.create(manager);

        expect(addSale.execute({
            managerId: manager.id,
            sellerId: seller.id,
            productId: "wrong-id",
        })).rejects.toThrow(ProductNotFound);

    })
})