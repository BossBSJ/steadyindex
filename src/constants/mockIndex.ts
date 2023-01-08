function createMockData(
    id: number,
    name: string,
    shortName: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    tokens: Array<{name: string, symbol:string, percent: number}>,
){
    return { id, name, shortName, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, tokens}
}


const MockIndex = [
    createMockData(1, 'DeFi Pulse Index', 'DPI', 21202121, 70.38, 1.9, -0.5, -0.8, -75.4, [{ name:"Bitcoin", symbol:"BTC", percent: 50}, {name:"Ethereum", symbol:"ETH", percent:25}, {name:"Avalanche", symbol:"AVAX", percent:25},{ name:"Bitcoin", symbol:"BTC", percent: 50}, {name:"Ethereum", symbol:"ETH", percent:25},{ name:"Bitcoin", symbol:"BTC", percent: 50},]),
    createMockData(2, 'Sushi DAO House', 'SDH', 100000, 6.58, 2.0, -0.1, 1.2, -55.5, [{name:"Bitcoin", symbol:"BTC", percent:50}, {name:"Ethereum", symbol:"ETH", percent:20}, {name:"Avalanche", symbol:"AVAX", percent:15}, {name:"Binance Coin", symbol:"BNB", percent:15}]),
    createMockData(3, 'Bankless BED Index', 'BBI', 100000, 44.83, 2.5, 0.5, 0, -68.7, [{name:"Bitcoin", symbol:"BTC", percent:60}, {name:"Ethereum", symbol:"ETH", percent:40}]),
]

export default MockIndex