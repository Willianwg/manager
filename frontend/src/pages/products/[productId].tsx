import { Paypal } from "@/components/paypal";
import { useApi } from "@/services/axios";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Error from "next/error";
import { ProductProps } from "../Dashboard";


export default function ProductDetails({ product, sellerId }: { product: ProductProps | null, sellerId: string | null }) {
    if (!product) {
        return <Error statusCode={404} />
    }

    const api = useApi();

    async function createOrder(){
        if(!product) return;
        const link = await api.createOrder(product.id);

        window.location.href = link;
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
            <section>
                <p>{product.name}</p>
                <p>{formatToCurrency(product.price)}</p>
                <p>{sellerId}</p>
                <button className="submit-btn" onClick={createOrder}><p>Buy</p></button>
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const api = useApi();
    const { productId } = context.query;
    let sellerId = null;

    if (context.query.rel) {
        sellerId = context.query.rel;
    }

    const id = typeof productId === "string" ? productId : "";

    const product: ProductProps | null = await api.getProduct(id);

    return {
        props: {
            product,
            sellerId,
        }
    }
}
