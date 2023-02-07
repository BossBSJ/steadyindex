import type { Axios } from "axios";
import axios from "axios";
import { Address } from "wagmi"

class ERC20Service {
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
    
    fetchERC20Price = async (erc20address: Address) => {
        const response = await this.axios.request({
            method: "GET",
            url: `/erc20/${erc20address}/price`,
            params: {chain: "avalanche"}
        })

        // console.log(response.data)
        return response.data.usdPrice
    }

    

}

export const erc20Service = new ERC20Service()