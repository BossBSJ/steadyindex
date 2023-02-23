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

const MyPort = () => {
    const [typeTable, setTypeTable] = useState<string>('Wallet')

    const [accountAddress, setAccountAddress] = useState<Address>()
    const [allIndexTokenAddress, setAllIndexTokenAddress] = useState<readonly Address[]>()
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


    const getCreatedIndex = useIndexTokenFactory(createdIndexAddress) 

    useEffect(() => {
        if(!getCreatedIndex) return
        setCreatedIndex(getCreatedIndex.index)
    }, [getCreatedIndex])

    const getHoldIndex = useIndexTokenFactory(indexHoldAddress)
    useEffect(() => {
        if(!getHoldIndex) return
        setIndexHold(getHoldIndex.index)
    }, [getHoldIndex])

    // const handleOnTypeTable = (_typeTable:string) =>{
    //     setTypeTable(_typeTable)
    // }


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