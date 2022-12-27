import { Autocomplete, Button, Card, Grid, Input, LinearProgress, Select, Slider, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import ChooseTokenCard from "./ChooseTokenCard"
import DeployCard from "./DeployCard"
import SetupIndexCard from "./SetupIndexCard"


const SetupIndex = () => {
    
    const [page, setPage] = useState<number>(1)
    const handleOnNext = () => {
        if(page == 3) 
            return
        setPage(page + 1)
    }

    const handleOnBack = () => {
        if(page == 1) 
            return
        setPage(page - 1)
    }

    return (
        <Card sx={{backgroundColor:"rgba(255,253,251,0.48)", width:"600px", height:"700px", display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"20px"}}>
            {page==1?<ChooseTokenCard/>:''}
            {page==2?<SetupIndexCard/>:''}
            {page==3?<DeployCard/>:''}
            <Box sx={{display:"flex", justifyContent:"space-around"}}>
                <Button onClick={handleOnBack} variant="outlined" sx={{width:"240px"}}>Back</Button>
                <Button onClick={handleOnNext} variant="contained" sx={{width:"240px"}}>{page==3? "Deploy Contract": "Next"}</Button>
            </Box>
        </Card>
    )
}

export default SetupIndex