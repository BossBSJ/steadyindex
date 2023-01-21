import { fetchToken } from "@wagmi/core"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

interface token {
    address: string
    decimals: number
    name: string
    symbol: string
    totalSupply: {
        formatted: string
        value: BigNumber
    }
}

//await Promise.all[A(), B()] => gotArr
// fetchToken({
//     address : ""
// })

export const useTokens = (tokens: readonly `0x${string}`[] | undefined) => { //fix type `0x${string}`[]

    const [tokenDatas, setTokenDatas] = useState<token[]>([])

    useEffect(() => {
        const fetchTokens = async () => {
            if(!tokens) return

            let prepareFetchToken = []
            for(let i = 0; i < tokens.length; i++){
                const token = fetchToken({
                    address: tokens[i]
                })
                prepareFetchToken.push(token)
            }
            const tokenArr = await Promise.all(prepareFetchToken)
            // console.log(tokenArr)
            setTokenDatas(tokenArr)
        }
        fetchTokens()
    }, [])

    return { tokenDatas }
}
