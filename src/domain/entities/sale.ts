import { Replace } from "../../helpers/Replace";
import { Product } from "./product";

type ProductInfo = {
    id: string;
}

type SaleInfo = {
    product: Product | ProductInfo;
    value: number;
    sellerId: string;
    managerId: string;
    createdAt: Date;
}

export class Sale {
    private _id: string;
    private readonly props: SaleInfo;

    constructor(saleInfo: Replace<SaleInfo, { createdAt?: Date }>, id: string) {
        this._id = id;

        this.props = {
            product: saleInfo.product,
            sellerId: saleInfo.sellerId,
            managerId: saleInfo.managerId,
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

    get soldBy() {
        return this.props.sellerId;
    }

    get id(){
        return this._id;
    }

    get managerId(){
        return this.props.managerId;
    }

    get createdAt(){
        return this.props.createdAt;
    }
}