import { IdGenerator } from "../src/utils/idGenerator";
import { makeManager } from "./factories/makeManager";
import { makeProduct } from "./factories/makeProduct";
import { makeSeller } from "./factories/makeSeller";

// https://mystore.com/:manager-short-id/:productname/:seller_id

describe("Bussiness rules", () => {
    it("Should be able to create a Manager", () => {
        const manager = makeManager();

        expect(manager.shortId).toEqual(manager.id.slice(0,8));
        expect(manager.sellers).toHaveLength(0);
        expect(manager.sales).toHaveLength(0);
    })
    it("Shoult be able to create a Manager and add a seller", ()=>{
        const manager = makeManager();

        const seller = makeSeller({
            name: "Seller Name",
        })

        manager.addSeller(seller);

        expect(manager.sellers).toHaveLength(1);
        expect(manager.sellers[0].shortId).toEqual(seller.id.slice(0,8));
        expect(manager.sellers[0].name).toEqual("Seller Name");
    })

    it("Shoult be able to create a Manager and add a seller and remove", ()=>{
        const manager = makeManager();

        const seller = makeSeller();

        manager.addSeller(seller);

        manager.removeSeller(seller.id);

        expect(manager.sellers).toHaveLength(0);
    })

    it("Shoult be able to create a Manager and add a product", ()=>{

        const manager = makeManager();
       
        const product = makeProduct({}, "product-id")

        manager.addProduct(product);

        expect(manager.products).toHaveLength(1);
        expect(manager.products[0].id).toEqual("product-id");
    })
})

it("Shoult be able to create a Manager and add a seller and remove", ()=>{
    const manager = makeManager();

    const product = makeProduct();

    manager.addProduct(product);

    manager.removeProduct(product.id);

    expect(manager.products).toHaveLength(0);
})

it("Should add a sale for a seller", () => {
    const idGenerator = new IdGenerator();

    const manager = makeManager();

    const seller = makeSeller();

    const product = makeProduct();
    
    manager.addProduct(product);
    manager.addSeller(seller);

    const saleId = idGenerator.generate();

    manager.addSale(product.id, seller.id, saleId);

    expect(manager.sellers).toHaveLength(1);
    expect(manager.products).toHaveLength(1);
    expect(manager.sales).toHaveLength(1);
    expect(manager.sellers[0].sales).toHaveLength(1);
    expect(manager.sales[0].id).toEqual(manager.sellers[0].sales[0].id)
    expect(manager.sales[0].soldBy).toEqual(manager.sellers[0].sales[0].soldBy)
    expect(manager.sales[0].soldProduct).toEqual(manager.sellers[0].sales[0].soldProduct)
    expect(manager.sales[0].price).toEqual(manager.sellers[0].sales[0].price)
})