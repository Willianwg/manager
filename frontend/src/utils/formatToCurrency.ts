

export function formatToCurrency(num: number) {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'brl',
    }).format(num);
}