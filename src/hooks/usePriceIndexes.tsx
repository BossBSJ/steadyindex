import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { readContract } from '@wagmi/core'
import { useComponentIndexes } from "./useComponentIndexes";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";
import { mockPriceOfComponents } from "../constants/mock";
import { erc20Service } from "../services/erc20Service";
import { token } from "../interfaces/token.interface";

export const usePriceIndexes = (indexAddresses: readonly Address[] | undefined, componentDatas: token[][] | undefined) => {
    const [priceIndexes, setPriceIndexes] = useState<number[]>()
    const [unitsNumArr, setUnitsNumArr] = useState<number[][]>()

    useEffect(() => {
        if(!indexAddresses || !componentDatas) return
        const getPrices = async () => {
            let priceArr = []
            let unitsNumArr = []
            for(let i = 0; i < indexAddresses?.length; i++) {
                const prepateGetPositionUnit = []
                for(let j = 0; j < componentDatas[i].length; j++){
                    const unit = readContract({
                        address: indexAddresses[i],
                        abi: INDEX_TOKEN_CONTRACT_ABI,
                        functionName: "getPositionUnit",
                        args: [componentDatas[i][j].address]
                    })
                    prepateGetPositionUnit.push(unit)
                }
                const units = await Promise.all(prepateGetPositionUnit)

                let price = 0
                let unitsNum = []
                for(let j = 0; j < units.length; j++){
                    const tokenPrice:number = await erc20Service.fetchERC20Price(componentDatas[i][j].address)
                    const unit = Number(units[j]._hex) / 10**componentDatas[i][j].decimals
                    unitsNum.push(unit)
                    price = price + unit * tokenPrice
                }
                priceArr.push(price)
                unitsNumArr.push(unitsNum)
            }
            setPriceIndexes(priceArr)
            setUnitsNumArr(unitsNumArr)
        }
        getPrices()
    },[indexAddresses, componentDatas])

    return { priceIndexes, unitsNumArr }

}