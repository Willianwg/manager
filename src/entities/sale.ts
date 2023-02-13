import { Replace } from "../helpers/Replace";
import { Product } from "./product";

type SellerInfo = {
    name: string;
    id: string;
}

type SaleInfo = {
    product: Product;
    seller: SellerInfo;
    value: number;
    createdAt: Date;
}

export class Sale {
    private _id: string;
    private readonly props: SaleInfo;

    constructor(saleInfo: Replace<SaleInfo, { createdAt?: Date }>, id: string) {
        this._id = id;

        this.props = {
            product: saleInfo.product,
            seller: saleInfo.seller,
            value: saleInfo.value,
            createdAt: saleInfo.createdAt ?? new Date(),
        }
    }

    get price() {
        return this.props.value;
    }
    get soldProduct() {
        return this.props.product;
    }

    get soldBy() : SellerInfo {
        return this.props.seller;
    }

    get id(){
        return this._id;
    }
}