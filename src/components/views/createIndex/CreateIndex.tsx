import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import { Token } from "../../../interfaces/token.interface";
import CreateStep from "./CreateStep";
import ChooseTokenCard from "./setupIndex/ChooseTokenCard";
import DeployCard from "./setupIndex/DeployCard";
import SetupIndexCard from "./setupIndex/SetupIndexCard";


const CreateIndex = () => {
    const [page, setPage] = useState<number>(0)
    
    const [tokenList, setTokenList] = useState<Token[]>([])
    const [indexName, setIndexName] = useState<string>('');
    const [indexSymbol, setIndexSymbol] = useState<string>('');
    const [startPrice, setStartPrice] = useState<string>('')
    const [streamingFee, setStreamingFee] = useState<string>('')
    const [issuanceFee, setIssuanceFee] = useState<string>('')

    const handleOnNext = () => {
        if(page == 3) 
            return
        setPage(page + 1)
    }

    const handleOnBack = () => {
        if(page == 0) 
            return
        setPage(page - 1)
    }

    

    function disableButton () {
        if(page==1){
            if(tokenList.length > 0)
                return true
            else
                return false
        }else if(page==2){
            if(indexName!='' && indexSymbol!='' && startPrice!='' && streamingFee!='' && issuanceFee!='')
                return true
            else
                return false
        }else if(page==3){
            return true
        }
    }

    return (
        <Box>
            <Container sx={{display:"flex", justifyContent:"space-around"}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"600px"}}>
                    <CreateStep page={page}/>
                    {page==0 && 
                    <Box sx={{display:"flex", justifyContent:"space-around"}}>
                        <Button variant="contained" sx={{width:"320px"}} onClick={handleOnNext}>
                            <Typography sx={{fontWeight:"bold"}}>Get Started</Typography>
                        </Button>
                    </Box>}
                    
                </Box>
                {page!=0 &&
                    <Card sx={{backgroundColor:"rgba(255,253,251,0.48)", width:"600px", height:"700px", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"40px", marginTop:"20px"}}>
                        {page==1 && 
                        <ChooseTokenCard 
                            tokenList={tokenList} 
                            setTokenList={setTokenList}
                        />}
                        {page==2 && 
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
                        {page==3 && 
                        <DeployCard
                            indexName={indexName}
                            indexSymbol={indexSymbol}
                            startPrice={startPrice}
                            streamingFee={streamingFee}
                            issuanceFee={issuanceFee}
                            tokenList={tokenList}
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
                                {page==3?
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