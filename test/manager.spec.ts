import { Manager } from "../src/entities/manager";
import { Product } from "../src/entities/product";
import { Seller } from "../src/entities/seller";

describe("Bussiness rules", () => {
    it("Should be able to create a Manager", () => {
        const manager = new Manager({
            name: "Willian Guedes",
            email: "willian@test.com",
            password: "jumanji",
        }, "manager_id");

        expect(manager.sellers).toHaveLength(0);
    })
    it("Shoult be able to create a Manager and add a seller", ()=>{
        const manager = new Manager({
            name: "Willian Guedes",
            email: "willian@test.com",
            password: "jumanji",
        }, "manager_id");

        const seller = new Seller({
            name: "Seller Name",
            email: "password",
            password: "12345",
        }, "seller_id")

        manager.addSeller(seller);

        expect(manager.sellers).toHaveLength(1);
        expect(manager.sellers[0].name).toEqual("Seller Name");
    })

    it("Shoult be able to create a Manager and add a product", ()=>{

        const manager = new Manager({
            name: "Willian Guedes",
            email: "willian@test.com",
            password: "jumanji",
        }, "manager_id");
       
        const product = new Product({
            name: "Ford car",
            price: 60000,
        }, "product-id")

        manager.addProduct(product);

        expect(manager.products).toHaveLength(1);
        expect(manager.products[0].id).toEqual("product-id");
    })
})