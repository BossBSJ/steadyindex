import { erc20ABI, readContract, fetchToken, Address } from "@wagmi/core"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi"

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

// get component from Indexes
export const useComponentIndexes = (tokenAddresses: readonly Address[] | undefined) => {

    const [componentDatas, setComponentDatas] = useState<token[][] | undefined>(undefined)

    useEffect(() => {
        const getComponents = async () => {
            if(!tokenAddresses) return

            let componentArr:token[][] = []
            for(let i = 0; i < tokenAddresses.length; i++){
                const components = await readContract({
                    address: tokenAddresses[i],
                    abi: INDEX_TOKEN_CONTRACT_ABI,
                    functionName: "getComponents"
                })
                
                let prepareFetchToken = []
                for(let j = 0; j < components.length; j++){
                    const token = fetchToken({
                        address: components[j]
                    })
                    prepareFetchToken.push(token)
                }
                const tokenArr = await Promise.all(prepareFetchToken)
                componentArr.push(tokenArr)
            }
            setComponentDatas(componentArr)
        }
        getComponents()
    },[tokenAddresses])

    return { componentDatas }
}