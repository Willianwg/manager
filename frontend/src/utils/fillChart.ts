import { SaleProps } from "@/pages/Dashboard";
import { format } from "date-fns";

export function fillChart(sales: SaleProps[], months: string[]): number[]{
    let results = Array(12).fill(0);

    sales.forEach(sale =>{
        let soldAt = format(new Date(sale.createdAt), "MMM");
        let dateIndex = months.findIndex(label => soldAt === label);

        results[dateIndex] += sale.value;
    })

    return results;
}