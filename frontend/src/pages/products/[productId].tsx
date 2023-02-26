import { Paypal } from "@/components/paypal";
import { useApi } from "@/services/axios";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ProductProps } from "../Dashboard";


export default function ProductDetails({ product, sellerId }: { product: ProductProps, sellerId: string | null }) {

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
            <section>
                <p>{product.name}</p>
                <p>{formatToCurrency(product.price)}</p>
                <p>{sellerId}</p>
                <Paypal price={product.price} />
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const api = useApi();
    const { productId } = context.query;
    let sellerId = null;

    if(context.query.rel){
        sellerId = context.query.rel;
    }

    const id = typeof productId === "string" ? productId : "";
    const product: ProductProps = await api.getProduct(id);

    return {
        props: {
            product,
            sellerId,
        }
    }
}
