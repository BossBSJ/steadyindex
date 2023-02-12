import { Address } from "wagmi";

export function createIndexOnTable(
    id: number,
    name: string,
    symbol: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    components: Array<{address: Address,name: string, symbol:string, ratio: number, unit:number, price:number, pricePerSet: number}>,
){
    return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
}