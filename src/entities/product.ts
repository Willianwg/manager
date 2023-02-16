import { Replace } from "../helpers/Replace";

export type ProductProps = {
    name: string;
    price: number;
    managerId: string;
    createdAt: Date;
}

export class Product {
    private _id: string;
    private props: ProductProps;

    constructor(product: Replace<ProductProps, { createdAt?: Date }>, id: string) {
        this._id = id;

        this.props = {
            name: product.name,
            price: product.price,
            managerId: product.managerId,
            createdAt: product.createdAt ?? new Date(),
        };
    }
    
    get name(){
        return this.props.name;
    }

    get price(){
        return this.props.price;
    }

    get id(){
        return this._id;
    }

    get managerId(){
        return this.props.managerId;
    }
}