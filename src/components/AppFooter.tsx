import { Container } from "@mui/material"
import { Box } from "@mui/system"
import logo from '../assets/logo.svg'

const AppFooter = () => {
    return (
        <Box sx={{backgroundColor:"rgba(255,255,255,0.40)"}}>
            <Container sx={{padding: "10px",}}>
                <img 
                    src={logo}
                    style={{width:"120px"}}
                />
            </Container>
        </Box>
    )
}

export default AppFooter