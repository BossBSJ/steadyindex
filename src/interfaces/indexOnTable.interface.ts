export interface IndexOnTable {
    id: number,
    name: string,
    symbol: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    components: Array<{name: string, symbol:string, percent: number}>,
}