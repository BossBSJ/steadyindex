import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useBlockNumber } from "wagmi"
import theme from "../../../theme"

type IProps = {
    page: number
}

const CreateStep = (props: IProps) => {
    const {page} = props
    
    const activeColorStyle = {
        background:theme.palette.gradient.secondary, 
        width:"46px", 
        height:"46px", 
        borderRadius:"50%",
        display: 'flex', 
        alignItems: 'center',
        justifyContent:"center",
    }

    const inActiveColorStyle = {
        background:theme.palette.secondary.main, 
        width:"46px", 
        height:"46px", 
        borderRadius:"50%",
        display: 'flex', 
        alignItems: 'center',
        justifyContent:"center"
    }

    return(
        <Box sx={{margin:"auto", display:"flex", flexDirection:"column", height:"400px", justifyContent:"space-evenly"}}>
            <Typography variant="h3" sx={{fontWeight:"bold", color:"#1D144F"}}>Create Your Index</Typography>
            <Box sx={{display:"flex"}}>
                <Box sx={page===1 || page===0? activeColorStyle: inActiveColorStyle}>
                    <Typography variant="h5" sx={{fontWeight:"bold", color:"white"}}>1</Typography>
                </Box>
                <Box sx={{marginLeft:"15px"}}>
                    <Typography variant="body1" sx={{fontWeight:"bold", color:"#1D144F"}}>Choose Tokens List</Typography>
                    <Typography variant="body2" sx={{color:"#9B97B3"}}>Select tokens to include in your Index. These can be changed later.</Typography>
                </Box>
            </Box>
            <Box sx={{display:"flex"}}>
                <Box sx={page===2 || page===0? activeColorStyle: inActiveColorStyle}>
                    <Typography variant="h5" sx={{fontWeight:"bold", color:"white"}}>2</Typography>
                </Box>
                <Box sx={{marginLeft:"15px"}}>
                    <Typography variant="body1" sx={{fontWeight:"bold", color:"#1D144F"}}>Setup Your Index</Typography>
                    <Typography variant="body2" sx={{color:"#9B97B3"}}>Add a name, symbol and starting price for your Set.</Typography>
                </Box>
            </Box>
            <Box sx={{display:"flex"}}>
                <Box sx={page===3 || page===0? activeColorStyle: inActiveColorStyle}>
                    <Typography variant="h5" sx={{fontWeight:"bold", color:"white"}}>3</Typography>
                </Box>
                <Box sx={{marginLeft:"15px"}}>
                    <Typography variant="body1" sx={{fontWeight:"bold", color:"#1D144F"}}>Deploy smart contracts</Typography>
                    <Typography variant="body2" sx={{color:"#9B97B3"}}>Your smart contracts will be published to the Avalanche mainnet.</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateStep