import { useEffect, useState } from "react"
import { erc20ABI, useContractRead, useContractReads, useToken } from "wagmi"
import { readContract, fetchToken } from '@wagmi/core'
import { ERC20_CONTRACT_ABI, INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useTokens } from "./useTokens"
import { useComponentIndexes } from "./useComponentIndexes"
import { BigNumber } from "ethers"
import { usePriceIndex } from "./usePriceIndex"
import { usePriceIndexes } from "./usePriceIndexes"
import { mockPriceOfComponents } from "../constants/mock"

export const useIndexTokenFactory = () => {
    const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = '0x8B13431EB604D4DeE7FC5D53ce8bB48cB67fF5B0'
    const [index, setIndex] = useState<IndexOnTable[]>()

    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexTokens"
    })

    // const { priceIndex } = usePriceIndex('0x9b093776F0D3A3A9B1b541A4c63ee237FEe63a46')

    const indexTokenAddress = getIndexTokensRead.data
    // console.log(indexTokenAddress)

    const { tokenDatas } = useTokens(indexTokenAddress)
    // console.log(tokenDatas)

    const { componentDatas } = useComponentIndexes(indexTokenAddress)
    // console.log(componentDatas)

    const { priceIndexes, unitsNumArr } = usePriceIndexes(indexTokenAddress)

    function createIndexOnTable(
        id: number,
        name: string,
        symbol: string,
        marketCap: number,
        price: number,
        dayChange: number,
        weekChange: number,
        monthChange: number,
        allTimeChange: number,
        components: Array<{name: string, symbol:string, ratio: number, unit:number, price:number, pricePerSet: number}>,
    ){
        return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
    }

    useEffect(() => {
        if(!tokenDatas || !componentDatas || !priceIndexes || !unitsNumArr) return
        let indexArr = []
        for(let i = 0; i < tokenDatas.length; i++){
            let components = []
            for(let j = 0; j < componentDatas[i].length; j++){
                components.push({
                    name: componentDatas[i][j].name,
                    symbol: componentDatas[i][j].symbol,
                    ratio: unitsNumArr[i][j] * mockPriceOfComponents[j] / priceIndexes[i] * 100,
                    unit: unitsNumArr[i][j],
                    price: mockPriceOfComponents[j],
                    pricePerSet: unitsNumArr[i][j] * mockPriceOfComponents[j]
                })
            }
            indexArr.push(
                createIndexOnTable(
                    i, 
                    tokenDatas[i].name, 
                    tokenDatas[i].symbol, 
                    2130000,
                    priceIndexes[i],
                    0,
                    0,
                    0,
                    0,
                    components
                )
            )
        }
        setIndex(indexArr)
    },[tokenDatas, componentDatas, priceIndexes, unitsNumArr])

    // console.log(index)

    return { index }
}