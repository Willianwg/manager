import { IdGeneratorInterface } from "../contracts/IdGenerator";
import { Sale } from "../entities/sale";
import { ManagerNotFound } from "../errors/managerNotFount";
import { ProductNotFound } from "../errors/productNotFound";
import { SellerNotFound } from "../errors/sellerNotFound";
import { ManagerRepository } from "../repositories/manager";
import { SaleRepository } from "../repositories/sale";

type AddSaleRequest = {
    productId: string;
    sellerId: string;
    managerId: string;
}

export class AddSale {
    constructor(private managerRepository: ManagerRepository, private saleRepository: SaleRepository,private idGenerator: IdGeneratorInterface){}

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
        
        const sale = new Sale({
            managerId,
            sellerId,
            product,
            value: product.price
        }, saleId);

        await this.saleRepository.create(sale);

        return {
            sale,
        }
    }
}