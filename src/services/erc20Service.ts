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
        let address = erc20address
        if(erc20address == "0xd00ae08403B9bbb9124bB305C09058E32C39A48c"){
            address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        }
        else if(erc20address == "0xB6076C93701D6a07266c31066B298AeC6dd65c2d"){
            address = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
        }
        const response = await this.axios.request({
            method: "GET",
            url: `/erc20/${address}/price`,
            params: {chain: "avalanche"}
        })

        return response.data.usdPrice
    }

    

}

export const erc20Service = new ERC20Service()