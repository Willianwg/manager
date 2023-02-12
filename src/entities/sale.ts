import { Replace } from "../helpers/Replace";

type SaleInfo = {
    product: string;
    seller: string;
    value: number;
    createdAt: Date;
}

export class Sale {
    private readonly props: SaleInfo;

    constructor(saleInfo: Replace<SaleInfo, { createdAt?: Date }>) {
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

    get soldBy() {
        return this.props.seller;
    }
}