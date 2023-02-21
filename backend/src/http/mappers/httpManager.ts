import { Manager } from "../../domain/entities/manager";
import { HttpProductMapper } from "./httpProduct";
import { HttpSaleMapper } from "./httpSale";
import { HttpSellerMapper } from "./httpSeller";

export class HttpManagerMapper {
    public static toHttp(manager: Manager){
        const sellers = manager.sellers.map(HttpSellerMapper.toHttp);
        const products = manager.products.map(HttpProductMapper.toHttp);
        const sales = manager.sales.map(HttpSaleMapper.toHttp);

        return {
            id: manager.id,
            name: manager.name,
            email: manager.email,
            sellers,
            products,
            sales,
        }
    }
}