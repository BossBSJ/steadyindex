import { Box, Button, Container, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/logo.svg'

const AppHeader = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{backgroundColor:"rgba(255,255,255,0.40)"}}>
            <Container sx={{padding: "10px", display:"flex", justifyContent: "space-between"}}>
                <Box 
                    sx={{padding: "20px", cursor:"pointer"}} 
                    onClick={() => {navigate(`/`)}}
                    >
                        <img 
                            src={logo}
                            style={{width:"120px"}}
                        />
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-around", width:"500px"}}>
                    <Typography
                        sx={{padding:"40px", cursor:"pointer", color:"#005FFF"}}
                        onClick={() => {navigate(`myPort`)}}
                    >
                        My port
                    </Typography>
                    <Button
                        variant="outlined" 
                        sx={{margin:"auto"}}
                        onClick={() => {navigate(`createIndex`)}}
                    >
                        <Typography sx={{fontWeight:"bold", color:"#627DFF"}}>Create Indexes</Typography>
                    </Button>
                    <Box sx={{margin:"auto"}}>
                        <ConnectButton/>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default AppHeader