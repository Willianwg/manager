import { Replace } from "../helpers/Replace";
import { Product } from "./product";
import { Sale } from "./sale";
import { Seller } from "./seller";

export type ManagerProps = {
    name: string;
    email: string;
    password: string;
    sellers: Seller[];
    products: Product[];
    sales: Sale[];
}

export class Manager {
    private _id: string
    private props: ManagerProps;

    constructor(manager: Replace<ManagerProps, { sellers?: Seller[]; products?: Product[]; sales?: Sale[]}>, id: string) {
        this._id = id;
        this.props = {
            name: manager.name,
            email: manager.email,
            password: manager.password,
            sellers: manager.sellers ?? [],
            products: manager.products ?? [],
            sales: manager.sales ?? [],
        };
    }

    get shortId(){
        return this._id.slice(0,8);
    }

    addSeller(seller: Seller){
        this.props.sellers.push(seller);
    }

    addProduct(product: Product){
        this.props.products.push(product);
    }

    addSale(productId: string, sellerId: string, id: string): Sale {
        const productIndex = this.products.findIndex(product => product.id === productId);
        const sellerIndex = this.sellers.findIndex(seller => seller.id === sellerId);

        const seller = this.sellers[sellerIndex];
        const product = this.products[productIndex];

        const sale = new Sale({
            sellerId: seller.id,
            managerId: this._id,
            product,
            value: product.price,
        }, id)

        this.props.sales.push(sale);
        this.props.sellers[sellerIndex].addSale(sale);

        return sale;
        
    }

    removeSeller(sellerId: string){
        const updatedSellers = this.sellers.filter(item => item.id !== sellerId);
        this.props.sellers = updatedSellers;
    }

    removeProduct(productId: string){
        const updatedProducts = this.products.filter(item => item.id !== productId);
        this.props.products = updatedProducts;
    }

    getSeller(sellerId: string){
        const seller = this.sellers.find(item => item.id === sellerId);

        return seller ? seller: null;
    }

    getProduct(productId: string){
        const product = this.products.find(item => item.id === productId);

        return product ? product: null;
    }

    get sellers(){
        return this.props.sellers;
    }
    get products(){
        return this.props.products;
    }

    get sales(){
        return this.props.sales;
    }

    get id(){
        return this._id;
    }
}