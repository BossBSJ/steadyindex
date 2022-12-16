import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"

const CreateStep = () => {
    return(
        <Box maxWidth="sm" sx={{margin:"auto"}}>
            <Typography variant="h3" sx={{fontWeight:"bold"}}>Create Your Index</Typography>
            <Box sx={{display:"flex"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>1</Typography>
                <Box>
                    <Typography variant="body1" sx={{fontWeight:"bold"}}>Choose Tokens List</Typography>
                    <Typography variant="body2">Select tokens to include in your Index. These can be changed later.</Typography>
                </Box>
            </Box>
            <Box sx={{display:"flex"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>2</Typography>
                <Box>
                    <Typography variant="body1" sx={{fontWeight:"bold"}}>Setup Your Index</Typography>
                    <Typography variant="body2">Add a name, symbol and starting price for your Set.</Typography>
                </Box>
            </Box>
            <Box sx={{display:"flex"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>3</Typography>
                <Box>
                    <Typography variant="body1" sx={{fontWeight:"bold"}}>Deploy smart contracts</Typography>
                    <Typography variant="body2">Your smart contracts will be published to the Avalanche mainnet.</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateStep