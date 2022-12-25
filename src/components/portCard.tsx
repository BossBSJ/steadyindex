import { Card, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { numberWithCommas } from "../utils/numberWithCommas"
import { PieChart, Pie, Sector, Cell } from "recharts";


const mockDataForChart = [
    { name: "Group A", value: 32 },
    { name: "Group B", value: 30 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 18 }
];

const mockCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartAllocation = () => {
    
    return(
        <PieChart width={170} height={170}>
            <Pie
                data={mockDataForChart}
                paddingAngle={1}
                dataKey="value"
                innerRadius={65}
                outerRadius={80}
                fill="#6B2FEB"
            >
                {mockDataForChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={mockCOLORS[index % mockCOLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    )
}

const PortCard = () => {
    return(
        <Card sx={{marginTop: "20px", padding:"15px",  borderRadius:"16px"}}>
            <Box>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="h6">Net worth</Typography>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={4}>Indexes</Grid>
                        <Grid item xs={4}>DCA / Month</Grid>
                        <Grid item xs={4}>NPL</Grid>
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