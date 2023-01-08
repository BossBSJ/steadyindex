import { Card, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import pieChart from '../../../assets/chart.svg'

//need to set this color gradient to theme.ts, I just don't know how to set it (primary, secondary gradient)


const DescriptionPaper = () => {

    const theme = useTheme()

    return(
        <Card sx={{backgroundColor:"rgba(255,255,255,0.75)", marginTop:"40px", display:"flex", padding:"20px"}}>
            <Box>
            <Box sx={{display:"flex", alignItems: 'end'}}>
                <Typography variant="h3" sx={{fontWeight: 'bold'}}>
                    Asset management for a {' '}
                    <Typography 
                        component="span"
                        variant="h2"
                        sx={{
                            fontWeight:"bold",
                            background: theme.palette.gradient.primary,
                            WebkitBackgroundClip:"text", 
                            WebkitTextFillColor:"transparent"
                        }}
                        >
                        DeFi world
                    </Typography>
                </Typography>
            </Box>
            <Typography variant="h6" 
                sx={{
                    fontWeight: 'bold', 
                    textAlign:'center',
                    background: theme.palette.gradient.secondary,
                    WebkitBackgroundClip:"text", 
                    WebkitTextFillColor:"transparent"
                }}
            >
                Bring your crypto strategies to life with STEADY index's leading portfolio management tool
            </Typography>
            </Box>
            <img style={{position:"relative"}} src={pieChart} width="170px"/>
        </Card>
    )
}

export default DescriptionPaper