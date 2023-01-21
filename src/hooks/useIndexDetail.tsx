import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { useContractRead, useToken } from "wagmi"
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { useComponentIndex } from "./useComponentIndex"

export const useIndexDetail = (idx: number) => {
    const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = '0x2Fd19F285c47D0B2e84fAa23Fe0B61A649F3C3E2'
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
        components: Array<{name: string, symbol:string, percent: number}>,
    ){
        return { id, name, symbol, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, components}
    }

    useEffect(() => {
        if(!componentData || !data) return
        let components = []
        for(let i = 0; i < componentData.length; i++){
            components.push({
                name: componentData[i].name,
                symbol: componentData[i].symbol,
                percent: 50
            })
        }
        const indexDetail = 
            createIndexOnTable(
                idx, 
                data.name, 
                data.symbol, 
                0,
                0,
                0,
                0,
                0,
                0,
                components
            )
        setIndex(indexDetail)
    },[componentData])

    return { index }
}