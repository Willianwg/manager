

export function formatToCurrency(num: number) {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'usd',
    }).format(num);
}