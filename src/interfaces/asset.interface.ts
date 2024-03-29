import { Address } from "wagmi"

export interface Asset  {
    address: Address
    chainId: number
    decimals: number
    logoURI: string
    name: string
    symbol: string
    tags: string[]
}