import { Asset } from "./asset.interface"

export interface ComponentList {
    asset: Asset
    allocation: number
    locked: boolean
    price: number
}