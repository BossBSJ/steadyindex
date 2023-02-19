import { Box, Container } from "@mui/material"
import { Address, useAccount, useContractRead } from "wagmi"
import { readContract } from '@wagmi/core'
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory"
import IndexTable from "../../IndexTable"
import PortCard from "./PortCard"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../../../constants/constants";
import { INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { useEffect, useState } from "react"
import { IndexOnTable } from "../../../interfaces/indexOnTable.interface"

const MyPort = () => {
    
    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexs",

    })
    
    const getAccountAddress = useAccount()

    const [accountAddress, setAccountAddress] = useState<Address>()

    useEffect(() => {
        if(!getAccountAddress) return
        setAccountAddress(getAccountAddress.address)
    }, [getAccountAddress])

    const [indexTokenAddressFiltered, setIndexTokenAddressFiltered] = useState<readonly Address[] | undefined>()

    useEffect(() => {
        if(!accountAddress || !getIndexTokensRead.data) return
        const filterIndexTokenAddress = async () => {

            const indexTokens = getIndexTokensRead.data
            
            if(!indexTokens) return
            let indexTokenAddressFiltered:Address[] = []

            for(let i = 0; i < indexTokens?.length; i++){
                const manager = await readContract({
                    address: indexTokens[i],
                    abi: INDEX_TOKEN_CONTRACT_ABI,
                    functionName: "manager"
                })
                if(manager === accountAddress)
                    indexTokenAddressFiltered.push(indexTokens[i])
            }
            setIndexTokenAddressFiltered(indexTokenAddressFiltered)
            
        }
        filterIndexTokenAddress()
    }, [getIndexTokensRead.data, accountAddress])


    const { index } = useIndexTokenFactory(indexTokenAddressFiltered) 

    const [myIndex, setMyIndex] = useState<IndexOnTable[] | undefined>(index)

    useEffect(() => {
        if(!index) return
        setMyIndex(index)
    }, [index])

    return(
        <Container>
            <PortCard/>
            <IndexTable index={myIndex} isMyPortPage={true}/>
        </Container>
    )
}

export default MyPort