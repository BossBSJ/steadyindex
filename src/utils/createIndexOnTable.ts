import { Address } from "wagmi";

export function createIndexOnTable(
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
    components: Array<{address: Address,name: string, symbol:string, ratio: number, unit:number, price:number, pricePerSet: number, strategicUnits:number}>,
){
    return { id, address, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
}