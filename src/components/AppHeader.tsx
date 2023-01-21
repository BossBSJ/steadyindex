import { Box, Button, Container, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/logo.svg'
import { RouteName } from '../constants/constants';
import theme from '../theme';

const AppHeader = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{backgroundColor:"rgba(255,255,255,0.40)"}}>
            <Container sx={{display:"flex", justifyContent: "space-between"}}>
                <Box 
                    sx={{padding: "20px", cursor:"pointer"}} 
                    onClick={() => {navigate(RouteName.default)}}
                    >
                        <img 
                            src={logo}
                            style={{width:"125px", height:"51px"}}
                        />
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-around", width:"750px"}}>
                    <Typography
                        sx={{padding:"40px", cursor:"pointer", color:theme.palette.primary.main}}
                        onClick={() => {navigate(RouteName.myPort)}}
                    >
                        My port
                    </Typography>
                    <Button
                        variant="outlined" 
                        sx={{margin:"auto"}}
                        onClick={() => {navigate(RouteName.createIndex)}}
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