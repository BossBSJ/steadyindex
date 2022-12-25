import { Button, Card, Container } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import CreateStep from "../components/createStep";
import SetupIndex from "../components/setupIndex";



const CreateIndex = () => {
    const [createIndexCard, setCreateIndexCard] = useState<boolean>(false)

    const handleOpenCreateIndexCard = () => {
        setCreateIndexCard(true)
    }

    return (
        <Box>
            <Container sx={{display:"flex"}}>
                <CreateStep/>
                {createIndexCard? <SetupIndex/> : ""}
            </Container>
            {!createIndexCard? <Button onClick={handleOpenCreateIndexCard}>Get Started</Button> : ""}
        </Box>
    )
}

export default CreateIndex