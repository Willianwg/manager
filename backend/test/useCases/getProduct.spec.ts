import { ProductNotFound } from "../../src/domain/errors/productNotFound";
import { GetProduct } from "../../src/domain/useCases/getProduct";
import { makeProduct } from "../factories/makeProduct";
import { InMemoryProductRepository } from "../inMemoryDB/product";


describe("Get Product", () => {
    it("Should be able to find a Product", async () => {
        const productRepository = new InMemoryProductRepository();
        const getProduct = new GetProduct(productRepository);

        const newProduct = makeProduct();

        productRepository.create(newProduct);

        const { product } = await getProduct.execute({
            productId: newProduct.id,
        });

        expect(product).toEqual(newProduct);
    })

    it("Should not be able to find a Product using wrong id", async () => {
        const productRepository = new InMemoryProductRepository();
        const getProduct = new GetProduct(productRepository);

        const newProduct = makeProduct();

        productRepository.create(newProduct);

        expect( 
            getProduct.execute({
                productId: "somewrongid",
            })
        ).rejects.toThrow(ProductNotFound);
    })
})