import { Box, Container } from "@mui/material"
import { Address, useAccount, useContractRead } from "wagmi"
import { readContract, fetchBalance } from '@wagmi/core'
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory"
import IndexTable from "../../IndexTable"
import PortCard from "./PortCard"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../../../constants/constants";
import { INDEX_TOKEN_CONTRACT_ABI, INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { useEffect, useState } from "react"
import { IndexOnTable } from "../../../interfaces/indexOnTable.interface"
import { element } from "@rainbow-me/rainbowkit/dist/css/reset.css"

const MyPort = () => {
    const [typeTable, setTypeTable] = useState<string>('Wallet')

    const [accountAddress, setAccountAddress] = useState<Address>()
    const [allIndexTokenAddress, setAllIndexTokenAddress] = useState<readonly Address[]>()
    const [allIndexToken, setAllIndexToken] = useState<IndexOnTable[] | undefined>()
    const [createdIndexAddress, setCreatedIndexAddress] = useState<readonly Address[]>()
    const [createdIndex, setCreatedIndex] = useState<IndexOnTable[] | undefined>()
    const [indexHoldAddress, setIndexHoldAddress] = useState<Address[]>()
    const [indexHold, setIndexHold] = useState<IndexOnTable[] | undefined>()
    
    const getAccountAddress = useAccount()
    useEffect(() => {
        if(!getAccountAddress) return
        setAccountAddress(getAccountAddress.address)
    }, [getAccountAddress])


    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexs",
    })
    useEffect(() => {
        if(!getIndexTokensRead) return
        setAllIndexTokenAddress(getIndexTokensRead.data)

    }, [getIndexTokensRead])

    const getAllIndex = useIndexTokenFactory(allIndexTokenAddress)
    useEffect(() => {
        if(!getAllIndex) return
        setAllIndexToken(getAllIndex.index)
    },[getAllIndex])

    useEffect(() => {
        if(!accountAddress || !allIndexTokenAddress) return
        const getIndexCreatedAddress = async () => {

            const indexTokens = allIndexTokenAddress
            
            if(!indexTokens) return
            let createdIndexAddress:Address[] = []

            for(let i = 0; i < indexTokens?.length; i++){
                const manager = await readContract({
                    address: indexTokens[i],
                    abi: INDEX_TOKEN_CONTRACT_ABI,
                    functionName: "manager"
                })
                if(manager === accountAddress)
                    createdIndexAddress.push(indexTokens[i])
            }
            setCreatedIndexAddress(createdIndexAddress)
        }

        const getIndexHold = async () => {
            let indexHoldAddress:Address[] = []
            for(let i = 0; i < allIndexTokenAddress.length; i++){
                const indexTokenAddress = allIndexTokenAddress[i]
                const indexBalance = await fetchBalance({
                    address: accountAddress,
                    token: indexTokenAddress
                })
                if(Number(indexBalance.formatted) > 0){
                    indexHoldAddress.push(indexTokenAddress)
                }
            }
            setIndexHoldAddress(indexHoldAddress)
        }

        getIndexCreatedAddress()
        getIndexHold()
    }, [allIndexTokenAddress, accountAddress])

    useEffect(() => {
        if(!allIndexToken || !indexHoldAddress || !createdIndexAddress) return
        let createdIndex = allIndexToken.filter(element => createdIndexAddress.includes(element.address))
        let holdIndex = allIndexToken.filter(element => indexHoldAddress.includes(element.address))
        setCreatedIndex(createdIndex)
        setIndexHold(holdIndex)
    },[allIndexToken,indexHoldAddress, createdIndexAddress])


    return(
        <Container>
            <PortCard/>
            <IndexTable 
                createdIndex={createdIndex} 
                holdIndex={indexHold}
                isMyPortPage={true}
                setTypeTable={setTypeTable}
                typeTable={typeTable}
            />
        </Container>
    )
}

export default MyPort