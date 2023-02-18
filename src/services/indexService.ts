import { readContract } from "@wagmi/core";
import type { Axios } from "axios";
import axios from "axios"
import { Address } from "wagmi";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";
import { token } from "../interfaces/token.interface";
import { erc20Service } from "./erc20Service";

class IndexService {
    private axios: Axios

    constructor() {
        this.axios = axios.create({
            baseURL: "https://deep-index.moralis.io/api/v2",
            headers: {
                Accept: "application/json", 
                "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY
            }
        })
    }

    getPrice = async (indexAddress:Address | undefined, componentData: token[] | undefined, blockNumber: number) => {
        if(!indexAddress || !componentData) return
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
        let prepareFetchPrice = []
        let tokenPrices = []
        for(let i = 0; i < units.length; i++){
            const tokenPrice = await erc20Service.fetchERC20Price(componentData[i].address, blockNumber)
            prepareFetchPrice.push(tokenPrice)
            // const unit = Number(units[i]._hex) / 10**componentData[i].decimals
            // price = price + unit * tokenPrice
        }
        tokenPrices = await Promise.all(prepareFetchPrice) //*
        for(let i = 0; i < units.length; i++){
            const unit = Number(units[i]._hex) / 10**componentData[i].decimals
            price = price + unit * tokenPrices[i]
        }

        return price
    }
}

export const indexService = new IndexService()