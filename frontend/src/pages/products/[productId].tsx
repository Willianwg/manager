import { Paypal } from "@/components/paypal";
import { useApi } from "@/services/axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductProps } from "../Dashboard";


export default function ProductDetails({ productId, productName, price }: { productId: string, productName: string, price: number }) {


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <section>
                <p>{productName}</p>
                <p>{price}</p>
                <Paypal price={price} />
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const api = useApi();
    const { productId } = context.query;

    const id = typeof productId === "string" ? productId : "";
    const product: ProductProps = await api.getProduct(id);

    return {
        props: {
            productName: product.name,
            price: product.price,
            productId
        }
    }
}
