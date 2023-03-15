import { SaleProps } from "@/pages/Dashboard";
import { format } from "date-fns";

export function fillChartWithSalesValues(sales: SaleProps[], months: string[]): number[]{
    const amountOfMonths = months.length;
    let salesValues = Array(amountOfMonths).fill(0);

    sales.forEach(sale =>{
        let saleDateInMMM = format(new Date(sale.createdAt), "MMM");
        let IndexOfDateInChart = months.findIndex(label => label === saleDateInMMM);

        salesValues[IndexOfDateInChart] += sale.value;
    })

    return salesValues;
}