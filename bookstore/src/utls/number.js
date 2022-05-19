function formatNumberToMoney(number) {
    return Number(number).toLocaleString("es-ES", { minimumFractionDigits: 0 })
}
export { formatNumberToMoney };