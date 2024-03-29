import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { readContract } from '@wagmi/core'
import { useComponentIndex } from "./useComponentIndex";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";
import { BigNumber } from "ethers";
import { mockPriceOfComponents } from "../constants/mock";
import { erc20Service } from "../services/erc20Service";
import { token } from "../interfaces/token.interface";

export const usePriceIndex = (indexAddress: Address | undefined, componentData: token[] | undefined,blockNumber?: number) => {

    const [priceIndex, setPriceIndex] = useState<number>()
    const [unitsNum, setUnitsNum] = useState<number[]>()
    const [strategicUnits, setStrategicUnits] = useState<number[]>()

    
    useEffect(() => {
        if(!componentData || !indexAddress) return
        const getPrice = async () => {
            const positions = await readContract({
                address: indexAddress,
                abi: INDEX_TOKEN_CONTRACT_ABI,
                functionName: "getPositions"
            })

            let price = 0
            let unitsNum = []
            let strategicUnits = []
            // let prepareFetchPrice = []
            let tokenPrices = []
            for(let i = 0; i < positions.length; i++){
                const tokenPrice = await erc20Service.fetchERC20Price(positions[i].component, blockNumber)
                // prepareFetchPrice.push(tokenPrice)
                tokenPrices.push(tokenPrice)
            }
            // const tokenPrices = await Promise.all(prepareFetchPrice) //*
            for(let i = 0; i < positions.length; i++){
                const unit = Number(positions[i].unit._hex) / 10**componentData[i].decimals
                unitsNum.push(unit)
                price = price + unit * tokenPrices[i]
                strategicUnits.push(Number(positions[i].strategicUnit._hex) / 10**18)
            }
            setPriceIndex(price)
            setUnitsNum(unitsNum)
            setStrategicUnits(strategicUnits)
        }
        getPrice()
    }, [componentData,indexAddress])

    return { priceIndex, unitsNum, strategicUnits }
}
