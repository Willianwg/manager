import { Replace } from "../helpers/Replace";
import { Sale } from "./sale";

type SellerProps = {
    name: string;
    email: string;
    password?: string;
    sales: Sale[];
}

export class Seller {
    private _id: string
    private props: SellerProps;

    constructor(seller: Replace<SellerProps, { password?: string; sales?: Sale[] }>, id: string) {
        this._id = id;
        this.props = {
            name: seller.name,
            email: seller.email,
            password: seller.password,
            sales: seller.sales ?? [],
        };
    }

    get shortId(){
        return this._id.slice(0,8);
    }

    addSale(sale: Sale){
        this.props.sales.push(sale);
    }

    get id(){
        return this._id;
    }
    get sales(){
        return this.props.sales;
    }

    get name(){
        return this.props.name;
    }

    get email(){
        return this.props.email;
    }

    get password(){
        return this.props.password;
    }
}