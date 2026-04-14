export function formatCurrency(value, currency = 'EUR') {
    const locale = navigator.language || "es-ES";
    const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
}