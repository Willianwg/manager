import { Line } from 'react-chartjs-2';
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
import { fillChartWithSalesValues } from '@/utils/fillChart';
import { SaleProps } from '@/pages/Dashboard';
import { generateChartDates } from '@/utils/generateChartDates';

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

export default function LineChart({ sales }: { sales:SaleProps[] }) {
    const datesLabels = generateChartDates();

    const data = {
        labels: datesLabels,
        datasets: [
            {
                label: 'Sales',
                data: fillChartWithSalesValues(sales, datesLabels),
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