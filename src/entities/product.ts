import { Replace } from "../helpers/Replace";

type BasicInfo = {
    name: string;
    id: string;
}

type ProductProps = {
    name: string;
    price: number;
}

export class Product {
    private _id: string;
    private props: ProductProps;

    constructor(Product: Replace<ProductProps, { createdAt?: Date }>, id: string) {
        this._id = id;

        this.props = {
            name: Product.name,
            price: Product.price,
        };
    }
    
    get id(){
        return this._id;
    }
}