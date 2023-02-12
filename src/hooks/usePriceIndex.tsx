import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { readContract } from '@wagmi/core'
import { useComponentIndex } from "./useComponentIndex";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";
import { BigNumber } from "ethers";
import { mockPriceOfComponents } from "../constants/mock";

export const usePriceIndex = (indexAddress: Address | undefined) => {

    const [priceIndex, setPriceIndex] = useState<number>()
    const [unitsNum, setUnitsNum] = useState<number[]>()

    const { componentData } = useComponentIndex(indexAddress)
    
    useEffect(() => {
        if(!componentData || !indexAddress) return
        const getPrice = async () => {
            const prepareGetPositionUnit = []
            for(let i = 0; i < componentData?.length; i++){
                const unit = await readContract({
                    address: indexAddress,
                    abi: INDEX_TOKEN_CONTRACT_ABI,
                    functionName: "getPostionUnit",
                    args: [componentData[i].address]
                })
                prepareGetPositionUnit.push(unit)
            }
            const units = await Promise.all(prepareGetPositionUnit)

            let price = 0
            let unitsNum = []
            for(let i = 0; i < units.length; i++){
                const unit = Number(units[i]._hex) / 10**componentData[i].decimals
                unitsNum.push(unit)
                price = price + unit * mockPriceOfComponents[i]
            }
            setPriceIndex(price)
            setUnitsNum(unitsNum)
        }
        getPrice()
    }, [componentData,indexAddress])

    return { priceIndex, unitsNum }
}
