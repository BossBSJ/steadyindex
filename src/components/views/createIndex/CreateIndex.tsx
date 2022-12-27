import { Button, Card, Container } from "@mui/material";
import { Box } from "@mui/system"
import React, { useState } from "react";
import CreateStep from "./CreateStep";
import SetupIndex from "./setupIndex/SetupIndex";



const CreateIndex = () => {
    const [createIndexCard, setCreateIndexCard] = useState<boolean>(false)

    const handleOpenCreateIndexCard = () => {
        setCreateIndexCard(true)
    }

    return (
        <Box>
            <Container sx={{display:"flex"}}>
                <Box>
                    <CreateStep/>
                    {!createIndexCard? <Button variant="contained" onClick={handleOpenCreateIndexCard}>Get Started</Button> : null}
                </Box>
                {createIndexCard? <SetupIndex/> : null}
            </Container>
        </Box>
    )
}

export default CreateIndex