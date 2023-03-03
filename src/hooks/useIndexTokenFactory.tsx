import { useEffect, useState } from "react"
import { erc20ABI, useContractRead, useContractReads, useToken } from "wagmi"
import { Address } from '@wagmi/core'
import { INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useTokens } from "./useTokens"
import { useComponentIndexes } from "./useComponentIndexes"
import { usePriceIndexes } from "./usePriceIndexes"
import { mockPriceOfComponents } from "../constants/mock"
import { createIndexOnTable } from "../utils/createIndexOnTable"
import { erc20Service } from "../services/erc20Service"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../constants/constants"

export const useIndexTokenFactory = (indexTokenAddress:readonly Address[] | undefined) => {

    const [index, setIndex] = useState<IndexOnTable[]>()

    const { tokenDatas } = useTokens(indexTokenAddress)

    const { componentDatas } = useComponentIndexes(indexTokenAddress)

    const { priceIndexes, unitsNumArr } = usePriceIndexes(indexTokenAddress)

    useEffect(() => {
        if(!indexTokenAddress || !tokenDatas || !componentDatas || !priceIndexes || !unitsNumArr) return
        const getIndexTokens = async () => {
            let indexArr = []
            for(let i = 0; i < tokenDatas.length; i++){
                const totalSupply = Number(tokenDatas[i].totalSupply.formatted)
                const marketCap = totalSupply * priceIndexes[i]

                let prepareTokenPrice = []
                let tokenPrices = []
                for(let j = 0; j < componentDatas[i].length; j++){
                    const tokenPrice = await erc20Service.fetchERC20Price(componentDatas[i][j].address)
                    tokenPrices.push(tokenPrice)
                    // prepareTokenPrice.push(tokenPrice)
                }
                // const tokenPrices = await Promise.all(prepareTokenPrice) //*

                let components = []
                for(let j = 0; j < componentDatas[i].length; j++){
                    const tokenPrice = tokenPrices[j]
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
                        tokenDatas[i].address, 
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
    },[indexTokenAddress, tokenDatas, componentDatas, priceIndexes, unitsNumArr])

    return { index }
}