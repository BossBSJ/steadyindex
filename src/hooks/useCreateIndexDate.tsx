import { readContract } from "@wagmi/core";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { INDEX_TOKEN_CONTRACT_ABI } from "../constants/abi";

export const useCreateIndexDate =  (indexAddress: Address | undefined) => {

    const [createdDate, setCreatedDate] = useState<string>()

    useEffect(() => {
        if(!indexAddress) return
        const getDate = async () => {
            const blockNumberCreated = await readContract({
                address: indexAddress,
                abi: INDEX_TOKEN_CONTRACT_ABI,
                functionName: "startBlock"
            })


            const response = await axios.request({
                headers: {
                    Accept: "application/json", 
                    "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY
                },
                method: "GET",
                url: `https://deep-index.moralis.io/api/v2/block/${blockNumberCreated}`,
                params: {chain: "avalanche testnet"}
            })

            const date = dayjs(response.data.timestamp).format("D MMMM YYYY")
            setCreatedDate(date)
        }
        getDate()
    }, [indexAddress])


    return { createdDate }
}