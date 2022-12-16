import { Card, Typography } from "@mui/material"
import { Box } from "@mui/system"
import pieChart from '../assets/chart.svg'

const DescriptionPaper = () => {
    return(
        <Card sx={{backgroundColor:"rgba(255,255,255,0.75)", marginTop:"40px", borderRadius:"16px"}}>
            <Box sx={{display:"flex", alignItems: 'end'}}>
                <Typography variant="h3" sx={{fontWeight: 'bold'}}>
                    Asset management for a {' '}
                    <span style={{fontSize: "60px"}}>DeFi world</span>
                </Typography>
            </Box>
            <Typography variant="h6" sx={{fontWeight: 'bold', textAlign:'center'}}>Bring your crypto strategies to life with Set's leading portfolio management tool</Typography>
        </Card>
    )
}
// src=`url(${pieChart})
export default DescriptionPaper