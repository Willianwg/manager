import { Sale } from "../entities/sale";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ProductNotFound } from "../errors/productNotFound";
import { SellerNotFound } from "../errors/sellerNotFound";
import { ManagerRepository } from "../repositories/manager";
import { IdGeneratorInterface } from "../utils/idGenerator";

type AddSaleRequest = {
    productId: string;
    sellerId: string;
    managerId: string;
}

export class AddSale {
    constructor(private managerRepository: ManagerRepository, private idGenerator: IdGeneratorInterface){}

    async execute(request:AddSaleRequest){
        const { productId, managerId, sellerId } = request;
        const manager = await this.managerRepository.findById(managerId);
        
        if(!manager){
            throw new ManagerNotFound();
        }

        const seller = manager.getSeller(sellerId);

        if(!seller){
            throw new SellerNotFound();
        }

        const product = manager.getProduct(productId);

        if(!product){
            throw new ProductNotFound();
        }

        const saleId = this.idGenerator.generate();

        const sale = manager.addSale(productId, sellerId, saleId);
        

        await this.managerRepository.update(manager);

        return {
            sale,
        }
    }
}