import Head from 'next/head';
import { useState, useEffect } from 'react';
import LineChart from '@/components/LineChart';
import { useApi } from '@/services/axios';
import { Seller, SellerProps } from '@/components/Seller';
import { Manager, ManagerProps } from '@/components/Manager';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { GetServerSideProps } from 'next';
import { RegisterSellerForm } from '@/components/registerSellerForm';

export type ProductProps = {
    id: string;
    name: string;
    price: number;
}

export type SaleProps = {
    id: string;
    productId: string;
    sellerId: string;
    createdAt: Date;
    value: number
}


export default function Dashboard({ managerR, sellerss, resultss, valuee, salee }: { salee: SaleProps[], managerR: ManagerProps, sellerss: SellerProps[], resultss: number[], valuee: number }) {
    const [value, setValue] = useState(valuee);
    const [results, setResults] = useState<number[]>(resultss);
    const [manager, setManager] = useState<ManagerProps | null>(managerR);
    const [sellers, setSellers] = useState<SellerProps[]>(sellerss);

    return (
        <div className="bg-blue-100 justify-center items-center flex flex-col gap-10 h-screen">
            <Head>
                <title>Managerr</title>
            </Head>
            <main className='flex gap-2'>
                <div className="gap-2 flex flex-col">
                    <section >
                        <div className="mb-3">
                            <label className="font-bold text-slate-800">Balance</label>
                        </div>
                        <div className="">
                            <p className="font-medium uppercase text-sm text-slate-600">
                                Total of sales:
                            </p>
                            <h1 className="font-bold text-2xl text-sky-900 mb-5">
                                {formatToCurrency(value)}
                            </h1>
                            <div className="">
                                <LineChart values={results} sales={salee}/>
                            </div>
                        </div>
                    </section>

                    <section >
                        <div className="mb-3">
                            <label className="font-bold text-slate-800">Sellers</label>
                        </div>
                        <div className="">
                            <p className="font-medium uppercase text-sm text-slate-600">
                                Number of sales:
                            </p>
                            <h1 className="font-bold text-2xl text-sky-900 mb-5">
                                {results.length}
                            </h1>
                            <div className="">
                                <div className="flex flex-col w-80 items-center justify-between gap-4">
                                    {sellers.map((seller, key) => (
                                        <div className="flex flex-col w-full" key={key}>
                                            <hr className='w-full' />
                                            <Seller  seller={seller} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <RegisterSellerForm />
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const api = useApi();
    const managerr: ManagerProps = await api.getManager();

    const sales = managerr.sales.map(sale => sale.value);
    const sellers = managerr.sellers;

    return {
        props: {
            managerR: managerr,
            sellerss: sellers,
            resultss: sales,
            salee: managerr.sales,
            valuee: sales.reduce((a, b) => a + b)

        }
    }
} 