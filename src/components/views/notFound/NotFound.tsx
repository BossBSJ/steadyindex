import { Button, Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    return(
        <Container>
            <Box>
                <Typography variant="h1" sx={{fontWeight:"bold"}}>O😦ps.</Typography>
                <Typography sx={{color:"#9B97B3"}}>We can't find the page you're looking for. Check your currently selected network?</Typography>
                <Button onClick={() => {navigate(`/`)}} variant="contained">
                    <Typography sx={{fontWeight:"bold"}}>Back to Home</Typography>
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound