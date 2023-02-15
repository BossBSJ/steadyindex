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
import { erc20Service } from "../services/erc20Service"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../constants/constants"

export const useIndexTokenFactory = () => {
    const [index, setIndex] = useState<IndexOnTable[]>()

    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexTokens",

    })

    const indexTokenAddress = getIndexTokensRead.data

    const { tokenDatas } = useTokens(indexTokenAddress)

    const { componentDatas } = useComponentIndexes(indexTokenAddress)

    const { priceIndexes, unitsNumArr } = usePriceIndexes(indexTokenAddress)

    useEffect(() => {
        if(!tokenDatas || !componentDatas || !priceIndexes || !unitsNumArr) return
        const getIndexTokens = async () => {
            let indexArr = []
            for(let i = 0; i < tokenDatas.length; i++){
                const totalSupply = Number(tokenDatas[i].totalSupply.formatted)
                const marketCap = totalSupply * priceIndexes[i]

                let components = []
                for(let j = 0; j < componentDatas[i].length; j++){
                    const tokenPrice:number = await erc20Service.fetchERC20Price(componentDatas[i][j].address)
                    components.push({
                        address: componentDatas[i][j].address,
                        name: componentDatas[i][j].name,
                        symbol: componentDatas[i][j].symbol,
                        ratio: unitsNumArr[i][j] * tokenPrice / priceIndexes[i] * 100,
                        unit: unitsNumArr[i][j],
                        price: tokenPrice,
                        pricePerSet: unitsNumArr[i][j] * tokenPrice
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
        }
        getIndexTokens()
    },[tokenDatas, componentDatas, priceIndexes, unitsNumArr])


    return { index }
}