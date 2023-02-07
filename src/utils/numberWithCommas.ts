export function numberWithCommas(x:number | undefined) {
    if(!x) return
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}