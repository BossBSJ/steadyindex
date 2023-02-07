import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { useContractRead, useToken } from "wagmi"
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { mockPriceOfComponents } from "../constants/mock"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useComponentIndex } from "./useComponentIndex"
import { usePriceIndex } from "./usePriceIndex"

export const useIndexDetail = (idx: number) => {
    const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = '0x8B13431EB604D4DeE7FC5D53ce8bB48cB67fF5B0'
    const [index, setIndex] = useState<IndexOnTable>()


    const getAddressIndex = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "indexTokens",
        args: [BigNumber.from(idx)]
    })

    const address = getAddressIndex.data

    const { data } = useToken({
        address: address
    })
    // console.log(data)

    const { priceIndex, unitsNum } = usePriceIndex(address)
    // console.log(priceIndex)
    // console.log(unitsNum)

    const { componentData } = useComponentIndex(address)
    // console.log(componentData)

    

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
        components: Array<{name: string, symbol:string, ratio: number, unit:number, price:number, pricePerSet:number}>,
    ){
        return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
    }

    useEffect(() => {
        if(!componentData || !data || !priceIndex || !unitsNum) return
        let components = []
        for(let i = 0; i < componentData.length; i++){
            components.push({
                name: componentData[i].name,
                symbol: componentData[i].symbol,
                ratio: unitsNum[i] * mockPriceOfComponents[i] / priceIndex * 100,
                unit: unitsNum[i],
                price: mockPriceOfComponents[i],
                pricePerSet: unitsNum[i] * mockPriceOfComponents[i]
            })
        }
        const indexDetail = 
            createIndexOnTable(
                idx, 
                data.name, 
                data.symbol, 
                2100000,
                priceIndex,
                0,
                0,
                0,
                0,
                components
            )
        setIndex(indexDetail)
    },[componentData, data, priceIndex, unitsNum])


    return { index }
}