import { BigNumber } from "ethers"
import { Address } from "wagmi"

export interface token {
    address: Address
    decimals: number
    name: string
    symbol: string
    totalSupply: {
        formatted: string
        value: BigNumber
    }
}