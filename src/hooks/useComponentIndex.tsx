import { Address, fetchToken, readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";
import { BigNumber } from "ethers"

interface token {
    address: Address
    decimals: number
    name: string
    symbol: string
    totalSupply: {
        formatted: string
        value: BigNumber
    }
}

//get component from Index
export const useComponentIndex = (indexAddress: Address | undefined ) => {

    const [componentData, setComponentData] = useState<token[]>()

    useEffect(() => {
        const getComponentData = async () => {
            if(!indexAddress) return
            
            const componentAddresses = await readContract({
                address: indexAddress,
                abi: INDEX_TOKEN_CONTRACT_ABI,
                functionName: "getComponents"
            })
            let prepareFetchToken = []
            for(let i = 0; i < componentAddresses.length; i++){
                const token = fetchToken({
                    address: componentAddresses[i]
                })
                prepareFetchToken.push(token)
            }
            const tokenArr = await Promise.all(prepareFetchToken)
            setComponentData(tokenArr)
        }
        getComponentData()
    },[])

    return { componentData }
}