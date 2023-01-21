import { Asset } from "./asset.interface"

export interface TokenList {
    asset: Asset  // should be address in lowerCase
    allocation: number
    locked: boolean
}