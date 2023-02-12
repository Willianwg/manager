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

        const seller = new Seller({
            name: "Seller Name",
            email: "password",
            password: "12345",
        }, "seller_id")

        const product = new Product({
            name: "Product Name",
            price: 200,
        }, "product_id")

        manager.addSeller(seller);

        manager.addProduct(product);

        expect(manager.sellers).toHaveLength(1);
        expect(manager.sellers[0].name).toEqual("Seller Name");
        expect(manager.products).toHaveLength(1);
        expect(manager.products[0].id).toEqual("product_id");
       
    })
})