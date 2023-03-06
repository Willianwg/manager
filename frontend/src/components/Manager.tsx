import { ProductProps, SaleProps } from "@/pages/Dashboard";
import { SellerProps } from "./Seller";

export type ManagerProps = {
    id: string;
    name: string;
    email: string;
    sellers: SellerProps[];
    products: ProductProps[];
    sales: SaleProps[]
}


export function Manager({ manager }: { manager: ManagerProps }) {

    return (
        <>
            <section className="h-min">
                <p>{manager.name}</p>
            </section>
        </>
    )
}