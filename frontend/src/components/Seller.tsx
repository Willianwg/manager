import { SaleProps } from "@/pages/Dashboard";
import { formatToCurrency } from "@/utils/formatToCurrency";

export type SellerProps = {
    id: string,
    name: string,
    email: string
    sales: SaleProps[]
}

export function Seller({ seller }: { seller: SellerProps }) {

    return (
        <>
            <div className="flex w-3/5 items-center gap-2">
                <div className="bg-rose-700 w-10 h-10 rounded-full"></div>
                <p className="">{ seller.name }</p>
            </div>
            <div className="flex w-2/5 justify-between items-center">
                <p className="">{formatToCurrency(seller.sales?.map(sale=> sale.value).reduce((a,b)=> a+b))}</p>
                <button className="font-bold text-slate400">{">"}</button>
            </div>
        </>
    )
}