import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import { ComponentList } from "../../../interfaces/component.interface";
import CreateStep from "./CreateStep";
import ChooseComponentCard from "./setupIndex/ChooseComponentCard";
import DeployCard from "./setupIndex/DeployCard";
import SetupIndexCard from "./setupIndex/SetupIndexCard";
import { useEffect } from "react";
import { usePrepareContractWrite, useProvider, useAccount, useContractWrite, Address } from "wagmi";
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useNavigate } from "react-router-dom";
import { RouteName } from "../../../constants/constants";
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { BigNumber, ethers } from "ethers";
import { mockPriceOfComponents } from "../../../constants/mock";

const INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS = '0x8B13431EB604D4DeE7FC5D53ce8bB48cB67fF5B0'

const CreateIndex = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState<number>(0)

    const [componentList, setComponentList] = useState<ComponentList[]>([])
    const [indexName, setIndexName] = useState<string>('');
    const [indexSymbol, setIndexSymbol] = useState<string>('');
    const [startPrice, setStartPrice] = useState<string>('')
    const [streamingFee, setStreamingFee] = useState<string>('')
    const [issuanceFee, setIssuanceFee] = useState<string>('')

    const [addressList, setAddressList] = useState<Address[]>([])
    const [unitList, setUnitList] = useState<BigNumber[]>([])

    const account = useAccount()
    const address = account.address ?? '0x'


    const prepareUnits = () => { 
        let unitList:BigNumber[] = []
        for(let i = 0; i < componentList.length; i++){
            const amount = (+startPrice) * (componentList[i].allocation / 100) / mockPriceOfComponents[i] //price of component is mocking
            const unit = ethers.utils.parseUnits(amount.toString(), componentList[i].asset.decimals)
            unitList.push(unit)
        }
        setUnitList(unitList)
    }

    const prepareAddresses = () => {
        let addressList:Address[] = []
        for(let i = 0; i < componentList.length; i++){
            addressList.push(componentList[i].asset.address)
        }
        setAddressList(addressList)
    }

    const createIndexToken = async () => {
        prepareUnits()
        prepareAddresses()
        const config = await prepareWriteContract({
            address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
            abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
            functionName: "createIndexToken",
            args: [addressList, unitList, address, indexName, indexSymbol]
        })
        const data = await writeContract(config)
    }


    const handleOnNext = async () => {
        
        if(page === 3) 
        {
            createIndexToken()
            // navigate(RouteName.default)
            return
        }
        setPage(page + 1)
    }

    const handleOnBack = () => {
        if(page === 0) 
            return
        setPage(page - 1)
    }

    function disableButton () {
        if(page===1){
            if(componentList.length > 0)
                return true
            else
                return false
        }else if(page===2){
            if(indexName!=='' && indexSymbol!=='' && startPrice!=='' && streamingFee!=='' && issuanceFee!=='')
                return true
            else
                return false
        }else if(page===3){
            return true
        }
    }

    return (
        <Box>
            <Container sx={{display:"flex", justifyContent:"space-around"}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"600px"}}>
                    <CreateStep page={page}/>
                    {page===0 && 
                    <Box sx={{display:"flex", justifyContent:"space-around"}}>
                        <Button variant="contained" sx={{width:"320px"}} onClick={handleOnNext}>
                            <Typography sx={{fontWeight:"bold"}}>Get Started</Typography>
                        </Button>
                    </Box>}
                    
                </Box>
                {page!==0 &&
                    <Card sx={{backgroundColor:"rgba(255,253,251,0.48)", width:"600px", height:"700px", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"40px", marginTop:"20px"}}>
                        {page===1 && 
                        <ChooseComponentCard 
                            componentList={componentList} 
                            setComponentList={setComponentList}
                        />}
                        {page===2 && 
                        <SetupIndexCard
                            indexName={indexName}
                            indexSymbol={indexSymbol}
                            startPrice={startPrice}
                            streamingFee={streamingFee}
                            issuanceFee={issuanceFee}
                            setIndexName={setIndexName}
                            setIndexSymbol={setIndexSymbol}
                            setStartPrice={setStartPrice}
                            setStreamingFee={setStreamingFee}
                            setIssuanceFee={setIssuanceFee}
                        />}
                        {page===3 && 
                        <DeployCard
                            indexName={indexName}
                            indexSymbol={indexSymbol}
                            startPrice={startPrice}
                            streamingFee={streamingFee}
                            issuanceFee={issuanceFee}
                            componentList={componentList}
                            onwerAddress={address}
                        />}
                        <Box sx={{display:"flex", justifyContent:"space-around"}}>
                            <Button onClick={handleOnBack} variant="outlined" sx={{width:"240px"}}>
                                <Typography sx={{fontWeight:"bold"}}>Back</Typography>
                            </Button>
                            <Button 
                                onClick={handleOnNext} 
                                variant="contained" 
                                sx={{width:"240px"}}
                                disabled={!disableButton()}
                            >
                                {page===3?
                                <Typography sx={{fontWeight:"bold"}}>Deploy Contract</Typography>: 
                                <Typography sx={{fontWeight:"bold"}}>Next</Typography>
                                }
                            </Button>
                        </Box>
                    </Card>
                }
            </Container>
        </Box>
    )
}

export default CreateIndex