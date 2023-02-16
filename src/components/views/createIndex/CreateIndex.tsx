import { Alert, Button, Card, Container, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import { ComponentList } from "../../../interfaces/component.interface";
import CreateStep from "./CreateStep";
import ChooseComponentCard from "./setupIndex/ChooseComponentCard";
import DeployCard from "./setupIndex/DeployCard";
import SetupIndexCard from "./setupIndex/SetupIndexCard";
import { useEffect } from "react";
import { usePrepareContractWrite, useProvider, useAccount, useContractWrite, Address, useWaitForTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS, RouteName } from "../../../constants/constants";
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { BigNumber, ethers } from "ethers";
import { mockPriceOfComponents } from "../../../constants/mock";
import { LoadingButton } from "@mui/lab";
import { erc20Service } from "../../../services/erc20Service";

const CreateIndex = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState<number>(0)

    const [componentList, setComponentList] = useState<ComponentList[]>([])
    const [indexName, setIndexName] = useState<string>('');
    const [indexSymbol, setIndexSymbol] = useState<string>('');
    const [startPrice, setStartPrice] = useState<string>('')

    const [addressList, setAddressList] = useState<Address[]>([])
    const [unitList, setUnitList] = useState<BigNumber[]>([])

    const account = useAccount()
    const address = account.address ?? '0x'

    useEffect(() => {
        const prepareUnits = async () => { 
            let unitList:BigNumber[] = []
            for(let i = 0; i < componentList.length; i++){
                let amount = 0
                const tokenPrice = await erc20Service.fetchERC20Price(componentList[i].asset.address)
                if(startPrice === ""){
                    continue
                }
                else {
                    amount = (+startPrice) * (componentList[i].allocation / 100) / tokenPrice
                }
                const unit = ethers.utils.parseUnits(amount.toFixed(componentList[i].asset.decimals).toString(), componentList[i].asset.decimals)
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
        prepareUnits()
        prepareAddresses()
    
    }, [componentList, startPrice])

    const { config } = usePrepareContractWrite({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "createIndexToken",
        args: [addressList, unitList, address, indexName, indexSymbol],
        enabled: (page === 3 && addressList.length === unitList.length)
    })

    const { data, write } = useContractWrite(config)

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnackBar(false);
    };

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log('create index succesful', data)
            setOpenSnackBar(true)
        }
    })

    const handleOnNext = async () => {
        
        if(page === 3) 
        {
            write?.()
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
            if(indexName!=='' && indexSymbol!=='' && startPrice!=='')
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
                            setIndexName={setIndexName}
                            setIndexSymbol={setIndexSymbol}
                            setStartPrice={setStartPrice}
                        />}
                        {page===3 && 
                        <DeployCard
                            indexName={indexName}
                            indexSymbol={indexSymbol}
                            startPrice={startPrice}
                            componentList={componentList}
                            onwerAddress={address}
                        />}
                        <Box sx={{display:"flex", justifyContent:"space-around"}}>
                            <Button onClick={handleOnBack} variant="outlined" sx={{width:"240px"}}>
                                <Typography sx={{fontWeight:"bold"}}>Back</Typography>
                            </Button>
                            <LoadingButton
                                loading={isLoading}
                                onClick={handleOnNext} 
                                variant="contained" 
                                sx={{width:"240px"}}
                                disabled={!disableButton()}
                            >
                                {page===3?
                                <Typography sx={{fontWeight:"bold"}}>Deploy Contract</Typography>: 
                                <Typography sx={{fontWeight:"bold"}}>Next</Typography>
                                }
                            </LoadingButton>
                        </Box>
                    </Card>
                }
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert severity="success">
                        Your Index Token has been created
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    )
}

export default CreateIndex