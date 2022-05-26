function formatNumberToMoney(number) {
    return Number(number).toLocaleString("es-ES", { minimumFractionDigits: 0 })
}

function roundingNumber(a) {
    return a - Math.floor(a) <= 0.5 ? Math.floor(a) + 0.5 : Math.floor(a) + 1
}

function formatVND(price) {
    const nf = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return nf.format(price);
}

function roundMoney(price) {
    return Math.round(price / 100) * 100;
}
export { 
    formatNumberToMoney, 
    roundingNumber,
    formatVND,
    roundMoney
};