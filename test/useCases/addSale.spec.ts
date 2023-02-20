import { ManagerNotFound } from "../../src/domain/errors/managerNotFount";
import { ProductNotFound } from "../../src/domain/errors/productNotFound";
import { SellerNotFound } from "../../src/domain/errors/sellerNotFound";
import { AddSale } from "../../src/domain/useCases/addSale";
import { IdGenerator } from "../../src/utils/idGenerator";
import { makeManager } from "../factories/makeManager";
import { makeProduct } from "../factories/makeProduct";
import { makeSeller } from "../factories/makeSeller";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { InMemorySaleRepository } from "../inMemoryDB/sale";


describe("Add Sale", () => {
    it("Should be able to add a Sale", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const saleRepository = new InMemorySaleRepository();
        const addSale = new AddSale(managerRepository, saleRepository, idGenerator);

        const manager = makeManager();
        const sellerOne = makeSeller();
        const sellerTwo = makeSeller();
        const product = makeProduct();

        manager.addSeller(sellerOne);
        manager.addSeller(sellerTwo);
        manager.addProduct(product);

        managerRepository.create(manager);

        const saleOne  = await addSale.execute({
            managerId: manager.id,
            sellerId: sellerOne.id,
            productId: product.id,
        })

        const saleTwo  = await addSale.execute({
            managerId: manager.id,
            sellerId: sellerTwo.id,
            productId: product.id,
        })

       expect(saleOne.sale.soldBy).toEqual(sellerOne.id);
       expect(saleTwo.sale.soldBy).toEqual(sellerTwo.id);
       expect(saleOne.sale.managerId).toEqual(manager.id);
       expect(saleTwo.sale.managerId).toEqual(manager.id);

    })

    it("Should not be able to add a Seller using wrong manager id", async () => {
        const idGenerator = new IdGenerator();
        const managerRepository = new InMemoryManagerRepository();
        const saleRepository = new InMemorySaleRepository();
        const addSale = new AddSale(managerRepository, saleRepository,idGenerator);

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
        const saleRepository = new InMemorySaleRepository();
        const addSale = new AddSale(managerRepository, saleRepository,idGenerator);

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
        const saleRepository = new InMemorySaleRepository();
        const addSale = new AddSale(managerRepository, saleRepository,idGenerator);

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