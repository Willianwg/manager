import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function LineChart({ values }: { values: number[] }) {

    const [results, setResults] = useState<number[]>(values);

    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: results,
                backgroundColor: 'rgb(200,200,250)',
                borderColor: 'rgb(20,100,200)',
                borderWidth: 2,
                fill: {
                    target: 'origin',
                    above: 'rgba(10, 100, 250,0.3)', // Area will be red above the origin
                    below: 'rgba(20,20,20)', // And blue below the origin
                },
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    useEffect(()=>{
        setResults(values);
    }, [values])

    return <Line data={data} options={options} />
}