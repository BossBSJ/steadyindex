import { Asset } from "./asset.interface"

export interface ComponentList {
    asset: Asset  // should be address in lowerCase
    allocation: number
    locked: boolean
}