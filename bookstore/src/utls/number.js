function formatNumberToMoney(number) {
    return Number(number).toLocaleString("es-ES", { minimumFractionDigits: 0 })
}

function roundingNumber(a) {
    return a - Math.floor(a) <= 0.5 ? Math.floor(a) + 0.5 : Math.floor(a) + 1
}
export { formatNumberToMoney, roundingNumber };