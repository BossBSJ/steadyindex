import { Asset } from "./asset.interface"

export interface Token {
    asset: Asset | undefined // should be address in lowerCase
    allocation: number
    locked: boolean
}