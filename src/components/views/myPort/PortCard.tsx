import { Card, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { numberWithCommas } from "../../../utils/numberWithCommas"
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";


const mockDataForChart = [
    { name: "Group A", value: 32 },
    { name: "Group B", value: 30 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 18 }
];

const mockCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];



const ChartAllocation = () => {

    const CustomToolTip = ({ active, payload, label }: any) => {
        if(active && payload && payload.length){
            return(
                <Box sx={{padding: "10px", borderRadius:"5px", backgroundColor:"rgba(0,0,0,0.6)", color:"white"}}>
                    <Typography sx={{fontWeight:"bold"}}>{payload[0].name}</Typography>
                    <Typography>Ratio: {payload[0].value}%</Typography>
                </Box>
            )
        }
        return null
    }

    return(
        <PieChart width={170} height={170} >
            <Pie
                data={mockDataForChart}
                paddingAngle={1}
                dataKey="value"
                innerRadius={65}
                outerRadius={80}
                fill="#6B2FEB"
                
            >
            {mockDataForChart.map((token, index) => (
                <Cell
                    key={index}
                    fill={mockCOLORS[index % mockCOLORS.length]} 
                />
            ))}
            </Pie>
            <Tooltip content={<CustomToolTip/>}/>
        </PieChart>
    )
}

const PortCard = () => {
    return(
        <Card sx={{marginTop: "20px", padding:"15px",  borderRadius:"16px"}}>
            <Box>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="h6" sx={{textDecoration:"underline #005FFF 2px"}}>Net worth</Typography>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #4A47FA 2px"}}>Indexes</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #07A6FF 2px"}}>DCA / Month</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #3CDCFF 2px"}}>NPL</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography variant="h4" sx={{fontWeight:"bold"}}>${numberWithCommas(11208.80)}</Typography>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>4</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>${numberWithCommas(208.80)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>+ 16.2%</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Indexs Allocation</Typography>
                    <Box sx={{display:"flex"}}>
                        <ChartAllocation/>
                        <Box sx={{width:"230px"}}>
                            {mockDataForChart.map((token, idx:number) => (
                                <Box key={idx} sx={{display:"flex", justifyContent:"space-between"}}>
                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>{token.name}</Typography>
                                    <Typography>{token.value}%</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Tokens Allocation</Typography>
                    <Box sx={{display:"flex"}}>
                        <ChartAllocation/>
                        <Box sx={{width:"230px"}}>
                            {mockDataForChart.map((token, idx:number) => (
                                <Box key={idx} sx={{display:"flex", justifyContent:"space-between"}}>
                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>{token.name}</Typography>
                                    <Typography>{token.value}%</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default PortCard