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
import { Chart } from 'react-chartjs-2';
import { generateDates } from '@/utils/generateDates';
import { fillChart } from '@/utils/fillChart';
import { SaleProps } from '@/pages/Dashboard';

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

export default function LineChart({ values, sales }: { values: number[], sales:SaleProps[] }) {
    const dates = generateDates()

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Sales',
                data: fillChart(sales, dates),
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
    
    return <Line data={data} options={options} />
}