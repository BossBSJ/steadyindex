import { Address } from "wagmi"

export interface allocation {
    name: string
    symbol: string
    address: Address
    balance: number
    value: number
    ratio: number
}