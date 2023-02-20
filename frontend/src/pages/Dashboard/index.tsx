import Head from 'next/head';
import { useState, useEffect } from 'react';
import LineChart from '@/components/LineChart';

export default function Dashboard() {
    const [value, setValue] = useState(0);
    const [results, setResults] = useState<number[]>([]);

    function load() {
        const values: number[] = [100, 300, 274, 266.5, 400, 420.3, 390, 500];

        setValue(values.reduce((a, b) => a + b));
        setResults(values);
    }

    useEffect(() => {
        setTimeout(load, 2000);
    }, []);

    function formatToCurrency(num: number) {
        return Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'brl',
        }).format(num);
    }

    return (
        <div className="bg-blue-100 justify-center items-center flex flex-col gap-10 h-screen">
            <Head>
                <title>Managerr</title>
            </Head>

            <section className="bg-white rounded-lg p-5 shadow-xl">
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
                        <LineChart values={results} />
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg p-5 shadow-xl">
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
                        <div className="flex w-80 items-center justify-between">
                            <div className="flex w-3/5 items-center gap-2">
                                <div className="bg-rose-700 w-10 h-10 rounded-full"></div>
                                <p className="">Willian Guedes</p>
                            </div>
                            <div className="flex w-2/5 justify-between items-center">
                                <p className="">{formatToCurrency(1000)}</p>
                                <button className="font-bold text-slate400">{">"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}