import { useEffect, useState } from "react"
import { erc20ABI, useContractRead, useContractReads, useToken } from "wagmi"
import { readContract, fetchToken } from '@wagmi/core'
import { ERC20_CONTRACT_ABI, INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useTokens } from "./useTokens"
import { useComponentIndexes } from "./useComponentIndexes"
import { usePriceIndexes } from "./usePriceIndexes"
import { mockPriceOfComponents } from "../constants/mock"
import { createIndexOnTable } from "../utils/createIndexOnTable"

const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = process.env.REACT_APP_INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS 

export const useIndexTokenFactory = () => {
    const [index, setIndex] = useState<IndexOnTable[]>()

    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexTokens"
    })

    const indexTokenAddress = getIndexTokensRead.data
    // console.log(indexTokenAddress)

    const { tokenDatas } = useTokens(indexTokenAddress)
    // console.log(tokenDatas)

    const { componentDatas } = useComponentIndexes(indexTokenAddress)
    // console.log(componentDatas)

    const { priceIndexes, unitsNumArr } = usePriceIndexes(indexTokenAddress)

    // const { data } = useContractRead({
    //     address: "0x94696130b9ebb0bd512097e63c642ebdb3c62c43",
    //     abi: INDEX_TOKEN_CONTRACT_ABI,
    //     functionName: "manager"
    // })
    // console.log(data)

    useEffect(() => {
        if(!tokenDatas || !componentDatas || !priceIndexes || !unitsNumArr) return
        let indexArr = []
        for(let i = 0; i < tokenDatas.length; i++){
            const totalSupply = Number(tokenDatas[i].totalSupply.formatted)
            const marketCap = totalSupply * priceIndexes[i]

            let components = []
            for(let j = 0; j < componentDatas[i].length; j++){
                components.push({
                    address: componentDatas[i][j].address,
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
                    marketCap,
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