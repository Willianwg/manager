import { format, subMonths, startOfMonth } from "date-fns";

export function generateDates(amountOfMonths: number = 12): string[]{
    let months: string[] = [];

    const today = new Date();

    for(let i = 0; i < amountOfMonths; i++){
        let month = subMonths(startOfMonth(today), i)

        months.unshift(format(month, "MMM"));
    }

    return months;
}