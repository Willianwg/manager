import { Seller, SellerProps } from "../../src/domain/entities/seller";
import { IdGenerator } from "../../src/utils/idGenerator";

type Override = Partial<SellerProps>

const idGenerator = new IdGenerator();

export function makeSeller(override: Override = {}, id?: string){
    const _id = id ?? idGenerator.generate();

    return new Seller({
        name: "Seller Name",
        email: "seller@email.com",
        password: "randompass",
        managerId: "managerid_",
        ...override
    }, _id)
}