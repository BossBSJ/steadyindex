import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    return(
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)"}}>
                <Typography variant="h1" sx={{fontWeight:"bold"}}>O😦ps.</Typography>
                <Typography sx={{color:"#9B97B3", width:"350px", textAlign:"center"}}>We can't find the page you're looking for. Check your currently selected network?</Typography>
                <Button 
                    onClick={() => {navigate(`/`)}} 
                    variant="contained"
                    sx={{width:"151px"}}
                >
                    <Typography sx={{fontWeight:"bold"}}>Back to Home</Typography>
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound