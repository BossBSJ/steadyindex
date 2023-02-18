import dayjs from "dayjs"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { Address, useBlockNumber, useContractRead, useToken, useTransaction } from "wagmi"
import { INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../constants/abi"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../constants/constants"
import { mockPriceOfComponents } from "../constants/mock"
import { IndexOnTable } from "../interfaces/indexOnTable.interface"
import { erc20Service } from "../services/erc20Service"
import { createIndexOnTable } from "../utils/createIndexOnTable"
import { useComponentIndex } from "./useComponentIndex"
import { useDateCreateIndex } from "./useDateCreateIndex"
import { useHistoricalPriceIndex } from "./useHistoricalPriceIndex"
import { usePriceIndex } from "./usePriceIndex"

export const useIndexDetail = (idx: number) => {
    
    const [index, setIndex] = useState<IndexOnTable>()
    const [componentPercentChange, setComponentPercentChange] = useState<number[]>()
    const [address, setAddress] = useState<Address>()
    const [historyPrice, setHistoryPrice] = useState<object[]>()

    const getAddressIndex = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "indexTokens",
        args: [BigNumber.from(idx)]
    })

    useEffect(() => {
        if(!getAddressIndex) return
        setAddress(getAddressIndex.data)
    }, [getAddressIndex])

    const token = useToken({
        address: address
    })

    const block = useBlockNumber({chainId: 43114})

    const tokenData = token.data
    const blockNumber = block.data

    const { priceIndex, unitsNum } = usePriceIndex(address, blockNumber)

    const { componentData } = useComponentIndex(address)

    const { createdDate } = useDateCreateIndex(address)

    const { beforePrice } = useHistoricalPriceIndex(address, componentData)

    useEffect(() => {
        if(!beforePrice || !priceIndex) return
        let historyPrice = beforePrice
        historyPrice.push({
            date: dayjs().format("D MMMM"),
            price: priceIndex.toFixed(2)
        })
        setHistoryPrice(historyPrice)
    }, [beforePrice, priceIndex])


    useEffect(() => {
        if(!componentData || !tokenData || !priceIndex || !unitsNum) return

        const getIndexDetail = async () => {
            const totalSupply = Number(tokenData?.totalSupply.formatted)
            const marketCap = totalSupply * priceIndex

            let components = []
            let componentPercentChange = []
            let prepareComponentPrices = []
            let preparePercentChanges = []
            for(let i = 0; i < componentData.length; i++){
                const componentPrice = erc20Service.fetchERC20Price(componentData[i].address)
                prepareComponentPrices.push(componentPrice)

                const percentChange = erc20Service.getPriceChangeOneDay(componentData[i].address)
                preparePercentChanges.push(percentChange)
            }
            const componentPrices = await Promise.all(prepareComponentPrices) //*
            const percentChanges = await Promise.all(preparePercentChanges) //*
            
            for(let i = 0; i < componentPrices.length; i++){
                const componentPrice = componentPrices[i]
                components.push({
                    address: componentData[i].address,
                    name: componentData[i].name,
                    symbol: componentData[i].symbol,
                    ratio: unitsNum[i] * componentPrice / priceIndex * 100,
                    unit: unitsNum[i],
                    price: componentPrice,
                    pricePerSet: unitsNum[i] * componentPrice
                })
                const percentChange = percentChanges[i]
                componentPercentChange.push(percentChange)
            }
            setComponentPercentChange(componentPercentChange)
            const indexDetail = 
                createIndexOnTable(
                    idx, 
                    tokenData.name, 
                    tokenData.symbol, 
                    marketCap,
                    priceIndex,
                    0,
                    0,
                    0,
                    0,
                    components
                )
            setIndex(indexDetail)
    }
    getIndexDetail()
    },[componentData, tokenData, priceIndex, unitsNum, address])


    return { index, componentPercentChange, createdDate, historyPrice }
}