import { Button, Card, Container } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import CreateStep from "./CreateStep";
import ChooseTokenCard from "./setupIndex/ChooseTokenCard";
import DeployCard from "./setupIndex/DeployCard";
import SetupIndexCard from "./setupIndex/SetupIndexCard";



const CreateIndex = () => {
    const [createIndexCard, setCreateIndexCard] = useState<boolean>(false)

    const handleOpenCreateIndexCard = () => {
        setCreateIndexCard(true)
    }

    const [page, setPage] = useState<number>(0)
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

    return (
        <Box>
            <Container sx={{display:"flex"}}>
                <Box>
                    <CreateStep/>
                    {page==0 && <Button variant="contained" onClick={handleOnNext}>Get Started</Button>}
                </Box>
                {page!=0 &&
                    <Card sx={{backgroundColor:"rgba(255,253,251,0.48)", width:"600px", height:"700px", display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"20px"}}>
                        {page==1 && <ChooseTokenCard/>}
                        {page==2 && <SetupIndexCard/>}
                        {page==3 && <DeployCard/>}
                        <Box sx={{display:"flex", justifyContent:"space-around"}}>
                            <Button onClick={handleOnBack} variant="outlined" sx={{width:"240px"}}>Back</Button>
                            <Button onClick={handleOnNext} variant="contained" sx={{width:"240px"}}>{page==3? "Deploy Contract": "Next"}</Button>
                        </Box>
                    </Card>
                }
            </Container>
        </Box>
    )
}

export default CreateIndex