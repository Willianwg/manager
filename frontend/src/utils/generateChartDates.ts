import { format, subMonths, startOfMonth } from "date-fns";

export function generateChartDates(amountOfMonthsInChart: number = 12): string[]{
    let months: string[] = [];

    const today = new Date();

    const amountOfMonthsBeforeCurrent = amountOfMonthsInChart - 1;

    for(let i = amountOfMonthsBeforeCurrent; i >= 0; i--){
        let month = subMonths(startOfMonth(today), i)

        months.push(format(month, "MMM"));
    }

    return months;
}