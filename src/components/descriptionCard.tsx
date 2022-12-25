import { Card, Typography } from "@mui/material"
import { Box } from "@mui/system"
import pieChart from '../assets/chart.svg'

//need to set this color gradient to theme.ts, I just don't know how to set it (primary, secondary gradient)


const DescriptionPaper = () => {
    return(
        <Card sx={{backgroundColor:"rgba(255,255,255,0.75)", marginTop:"40px", display:"flex", padding:"20px"}}>
            <Box>
            <Box sx={{display:"flex", alignItems: 'end'}}>
                <Typography variant="h3" sx={{fontWeight: 'bold'}}>
                    Asset management for a {' '}
                    <span 
                        style={{
                            fontSize: "60px", 
                            background:"linear-gradient(99.29deg, #004FD0 -23.14%, #3280FF 32.47%, #5E7DFF 79.6%, #7A7AFF 122.55%)",
                            WebkitBackgroundClip:"text", 
                            WebkitTextFillColor:"transparent"
                        }}
                        >
                        DeFi world
                    </span>
                </Typography>
            </Box>
            <Typography variant="h6" 
                sx={{
                    fontWeight: 'bold', 
                    textAlign:'center',
                    background:"linear-gradient(282.09deg, #BDD5FE -68.96%, #3636F9 155.77%)",
                    WebkitBackgroundClip:"text", 
                    WebkitTextFillColor:"transparent"
                }}
            >
                Bring your crypto strategies to life with STEADY index's leading portfolio management tool
            </Typography>
            </Box>
            <img src={pieChart} width="150px"/>
        </Card>
    )
}

// src=`url(${pieChart})

export default DescriptionPaper