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
            <section className="bg-white rounded-lg p-5 shadow-xl h-min">
                <p>{manager.name}</p>
            </section>
        </>
    )
}