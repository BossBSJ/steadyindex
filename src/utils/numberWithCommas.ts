export function numberWithCommas(x:number | undefined) {
    if(!x) return
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}