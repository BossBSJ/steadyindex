export const mockColorCurrency: { [token: string]: string } = {
    "BTC": "#f2a900",
    "ETH": "#3c3c3d",
    "AVAX": "#E84142",
    "BNB": "#f3ba2f",
}

function createMockData(
    id: number,
    name: string,
    symbol: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    components: Array<{name: string, symbol:string, ratio: number}>,
){
    return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
}


export const mockIndex = [
    createMockData(0, '12345678901234567890', 'DPI', 21202121, 70.38, 1.9, -0.5, -0.8, -75.4, [{ name:"Bitcoin", symbol:"BTC", ratio: 50}, {name:"Ethereum", symbol:"ETH", ratio:25}, {name:"Avalanche", symbol:"AVAX", ratio:25},{ name:"Bitcoin", symbol:"BTC", ratio: 50}, {name:"Ethereum", symbol:"ETH", ratio:25},{ name:"Bitcoin", symbol:"BTC", ratio: 50},]),
    createMockData(1, 'Sushi DAO House', 'SDH', 100000, 6.58, 2.0, -0.1, 1.2, -55.5, [{name:"Bitcoin", symbol:"BTC", ratio:50}, {name:"Ethereum", symbol:"ETH", ratio:20}, {name:"Avalanche", symbol:"AVAX", ratio:15}, {name:"Binance Coin", symbol:"BNB", ratio:15}]),
    createMockData(2, 'Bankless BED Index', 'BBI', 100000, 44.83, 2.5, 0.5, 0, -68.7, [{name:"Bitcoin", symbol:"BTC", ratio:60}, {name:"Ethereum", symbol:"ETH", ratio:40}]),
]

export const mockPriceOfComponents = [17.8, 1] //price of usd [1]WAVAX, [2]USDC 