import { Product, ProductProps } from "../../src/entities/product";
import { IdGenerator } from "../../src/utils/idGenerator";

type Override = Partial<ProductProps>

const idGenerator = new IdGenerator();

export function makeProduct(override: Override = {}, id?: string){
    const _id = id ?? idGenerator.generate();

    return new Product({
        name: "Product Name",
        price: 199,
        managerId: "managerid_",
        ...override
    }, _id)
}