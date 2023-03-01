import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Address } from "wagmi"
import { useDateCreateIndex } from "./useDateCreateIndex"
import axios from "axios"
import { indexService } from "../services/indexService"
import { token } from "../interfaces/token.interface"
import { historyPrice } from "../interfaces/historyPrice.interface"


export const useHistoricalPriceIndex = (indexAddress:Address | undefined, componentData?: token[]) => {
    const [beforePrice, setBeforePrice] = useState<historyPrice[]>()

    const { unformatCreatedDate } = useDateCreateIndex(indexAddress)

    useEffect(() => {
        if(!indexAddress && !componentData && !unformatCreatedDate) return
        const getHistoryPrices = async () => {
            const dateNow = dayjs()
            const dateInTimeStampInSecond = Date.now() / 1000
            
            let dayDiff = dateNow.diff(unformatCreatedDate, "day")

            if(dayDiff > 10)
                dayDiff = 10

            let historicalTimestamps = []
            for(let i = 0; i < dayDiff; i++){
                const historicalTimestamp = dateInTimeStampInSecond - 86400 * (i+1)
                historicalTimestamps.push(historicalTimestamp)
            }

            let prepareHistoricalBlockNumbers = []
            let historicalBlockNumbers = []
            for(let i = 0; i < historicalTimestamps.length; i++){
                const historicalTimestamp = historicalTimestamps[i].toString()
                const historicalBlockNumber = await axios.request({
                    headers: {
                        Accept: "application/json", 
                        "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY
                    },
                    method: "GET",
                    url: `https://deep-index.moralis.io/api/v2/dateToBlock`,
                    params: {chain: "avalanche", date: historicalTimestamp}
                })
                historicalBlockNumbers.push(historicalBlockNumber)
                // prepareHistoricalBlockNumbers.push(historicalBlockNumber)
            }
            // const historicalBlockNumbers = await Promise.all(prepareHistoricalBlockNumbers) //*

            let prepareIndexPrices = []
            let indexPrices = []
            for(let i = historicalBlockNumbers.length - 1; i >= 0; i--){
                const indexPrice = await indexService.getPrice(indexAddress, componentData, historicalBlockNumbers[i].data.block)
                // prepareIndexPrices.push(indexPrice)
                const date = dayjs.unix(historicalTimestamps[i]).format("D MMMM")
                indexPrices.push({
                    date: date,
                    price: Number(indexPrice?.toFixed(2))
                })
            }
            // const indexPrices = await Promise.all(prepareIndexPrices)
            setBeforePrice(indexPrices)
        }

        setTimeout(getHistoryPrices, 500)
        // getHistoryPrices()

    }, [indexAddress, componentData, unformatCreatedDate])

    return { beforePrice }
}
