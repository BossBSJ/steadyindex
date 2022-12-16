import { Box, Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/logo.svg'

const AppHeader = () => {
    return (
        <Box sx={{backgroundColor:"rgba(255,255,255,0.40)"}}>
            <Container sx={{padding: "10px", display:"flex", justifyContent: "space-between"}}>
                <Box sx={{padding: "20px"}}>
                    <NavLink to="/" style={{textDecoration:"none" ,color:"black"}}>
                        <img 
                            src={logo}
                            style={{width:"120px"}}
                        />
                    </NavLink>
                </Box>
                <Box sx={{display:"flex"}}>
                    <NavLink to="/createIndexes" style={{textDecoration:"none"}}>
                        <Button sx={{padding: "20px", borderRadius:"20px"}} variant="outlined">
                            Create Indexes
                        </Button>
                    </NavLink>
                    <Box sx={{padding: "20px"}}>
                        <ConnectButton/>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default AppHeader