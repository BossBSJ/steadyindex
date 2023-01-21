import { useEffect, useState } from "react"
import { erc20ABI, useContractRead, useContractReads, useToken } from "wagmi"
import { readContract, fetchToken } from '@wagmi/core'
import { ERC20_CONTRACT_ABI, INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useTokens } from "./useTokens"
import { useComponentIndexes } from "./useComponentIndexes"

export const useIndexTokenFactory = () => {
    const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = '0x2Fd19F285c47D0B2e84fAa23Fe0B61A649F3C3E2'
    const [index, setIndex] = useState<IndexOnTable[]>([])

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
        components: Array<{name: string, symbol:string, percent: number}>,
    ){
        return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
    }

    useEffect(() => {
        if(!componentDatas) return
        let indexArr = []
        for(let i = 0; i < tokenDatas.length; i++){
            let components = []
            for(let j = 0; j < componentDatas[i].length; j++){
                components.push({
                    name: componentDatas[i][j].name,
                    symbol: componentDatas[i][j].symbol,
                    percent: 50
                })
            }
            indexArr.push(
                createIndexOnTable(
                    i, 
                    tokenDatas[i].name, 
                    tokenDatas[i].symbol, 
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    components
                )
            )
        }
        setIndex(indexArr)
    },[tokenDatas, componentDatas])

    // console.log(index)

    return { index }
}