import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { useContractRead, useToken, useTransaction } from "wagmi"
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { mockPriceOfComponents } from "../constants/mock"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { createIndexOnTable } from "../utils/createIndexOnTable"
import { useComponentIndex } from "./useComponentIndex"
import { usePriceIndex } from "./usePriceIndex"

const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = process.env.REACT_APP_INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS 

export const useIndexDetail = (idx: number) => {
    
    const [index, setIndex] = useState<IndexOnTable>()

    const getAddressIndex = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "indexTokens",
        args: [BigNumber.from(idx)]
    })

    const address = getAddressIndex.data

    const token = useToken({
        address: address
    })
    const tokenData = token.data

    const { priceIndex, unitsNum } = usePriceIndex(address)

    const { componentData } = useComponentIndex(address)

    // console.log(" ")
    // console.log('componentData', componentData)
    // console.log('tokenData', tokenData)
    // console.log('priceIndex', priceIndex)
    // console.log('unitsNum', unitsNum)
    // console.log('address', address)

    // const { data } = useTransaction({
    //     hash: "0xc5a510eb4532183d6abaa542a8bb13fa6d89e59648613f79e3574df2ea7fb3ed"
    // })
    // console.log(data)
    
    useEffect(() => {
        if(!componentData || !tokenData || !priceIndex || !unitsNum) return
        const totalSupply = Number(tokenData?.totalSupply.formatted)
        const marketCap = totalSupply * priceIndex

        let components = []
        for(let i = 0; i < componentData.length; i++){
            components.push({
                address: componentData[i].address,
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
                tokenData.name, 
                tokenData.symbol, 
                marketCap,
                priceIndex,
                0,
                0,
                0,
                0,
                components
            )
        setIndex(indexDetail)
    },[componentData, tokenData, priceIndex, unitsNum, address])


    return { index }
}