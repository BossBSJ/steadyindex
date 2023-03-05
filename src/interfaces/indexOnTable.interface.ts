import { Address } from "wagmi";

export interface IndexOnTable {
    id:number,
    address: Address,
    name: string,
    symbol: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    components: Array<{address: Address,name: string, symbol:string, ratio: number, unit:number, price:number, pricePerSet:number, strategicUnits:number}>,
}