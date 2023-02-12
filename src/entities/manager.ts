import { Replace } from "../helpers/Replace";
import { Product } from "./product";
import { Seller } from "./seller";

type ManagerProps = {
    name: string;
    email: string;
    password: string;
    sellers: Seller[];
    products: Product[];
}

export class Manager {
    private _id: string
    private props: ManagerProps;

    constructor(manager: Replace<ManagerProps, { sellers?: Seller[]; products?: Product[]}>, id: string) {
        this._id = id;
        this.props = {
            name: manager.name,
            email: manager.email,
            password: manager.password,
            sellers: manager.sellers ?? [],
            products: manager.products ?? [],
        };
    }

    addSeller(seller: Seller){
        this.props.sellers.push(seller);
    }

    addProduct(product: Product){
        this.props.products.push(product);
    }

    get sellers(){
        return this.props.sellers;
    }
    get products(){
        return this.props.products;
    }

    get id(){
        return this._id;
    }
}