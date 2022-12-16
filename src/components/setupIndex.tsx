import { Button, Card, Input, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"


const SetupIndex = () => {
    const ChooseTokenPage = () => {
        return(
            <Box sx={{padding: "20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Choose Token List</Typography>
                <Input placeholder="Search for token" type="search"/>
                <Box>
                    
                </Box>
            </Box>
        )
    }

    const SetupIndexPage = () => {
        return(
            <Box sx={{padding:"20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Setup Your Index</Typography>
                <Box>
                    <Typography>Index Name</Typography>
                    <TextField placeholder="e.g. Steady whale index"/>
                </Box>
                <Box>
                    <Typography>Index Symbol</Typography>
                    <TextField placeholder="e.g. SWI"/>
                </Box>
                <Box>
                    <Typography>Straing Price (USD)</Typography>
                    <TextField placeholder="100.00"/>
                </Box>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Set Fees</Typography>
                    <Box sx={{display:"flex"}}>
                        <Box>
                            <Typography variant="body2">Streaming Fee</Typography>
                            <TextField placeholder="100.00"/>
                        </Box>
                        <Box>
                            <Typography variant="body2">Insurance Fee</Typography>
                            <TextField placeholder="100.00"/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    
    const DeployPage = () => {
        return (
            <Box sx={{padding: "20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Deploy smart contract</Typography>
            </Box>
        )
    }
    
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
        <Card sx={{backgroundColor:"rgba(255,253,251,0.48)"}}>
            {page==1?<ChooseTokenPage/>:''}
            {page==2?<SetupIndexPage/>:''}
            {page==3?<DeployPage/>:''}
            <Box>
                <Button onClick={handleOnBack}>Back</Button>
                <Button onClick={handleOnNext}>{page==3? "Deploy Contract": "Next"}</Button>
            </Box>
        </Card>
    )
}

export default SetupIndex