import { Button, Card, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react";
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { mockColorCurrency } from "../../../constants/mockColorCurrency";
import MockIndex from "../../../constants/mockIndex";
import theme from "../../../theme";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import BuyModal from "../../Modal/BuyModal";
import SellModal from "../../Modal/SellModal";
import {
    LineChart,
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const headers = [
    "Quantity per Set", "Token Price", "Currnet Price Allocation", "Percent Change", "Total Price per Set"
]

const mockHistoryPrice = [
    {
        date:"13th Nov",
        price: 70.8
    },
    {
        date:"14th Nov",
        price: 80
    },
    {
        date:"15th Nov",
        price: 90
    },
    {
        date:"16th Nov",
        price: 85
    },
    {
        date:"17th Nov",
        price: 87
    },
    {
        date:"18th Nov",
        price: 95
    },
]

const MyLineChart = () => {
    return(
        <AreaChart
            width={1100}
            height={400}
            data={mockHistoryPrice}
        >
            <XAxis dataKey="date" />
            <Tooltip />
            <Legend />
            <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
        </AreaChart>
    )
}

const IndexDetail = () => {

    let { indexId } = useParams()

    const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
    const handleOpenBuyModal = () =>{
        setShowBuyModal(true)
    }
    const handleCloseBuyModal = () =>{
        setShowBuyModal(false)
    }

    const [showDCAModal, setShowDCAModal] = useState<boolean>(false)
    const handleOpenDCAModal = () =>{
        setShowDCAModal(true)
    }
    const handleCloseDCAModal = () =>{
        setShowDCAModal(false)
    }

    const [showSellModal, setShowSellModal] = useState<boolean>(false)
    const handleOpenSellModal = () =>{
        setShowSellModal(true)
    }
    const handleCloseSellModal = () =>{
        setShowSellModal(false)
    }

    // console.log(MockIndex[Number(indexId) - 1])

    const data = MockIndex[Number(indexId) - 1]

    return(
        <Container>
            <NavLink to="/" style={{textDecoration:"none" ,color:"#787485"}}>
                &lt; Back to Thematic Exposure Sets 
            </NavLink>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography  variant="h4" sx={{fontWeight:"bold"}}>{data.name}</Typography>
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Button variant="contained" onClick={handleOpenDCAModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>DCA</Typography>
                    </Button>
                    <Button variant="contained" onClick={handleOpenBuyModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>Buy</Typography>
                    </Button>
                    <Button variant="contained" onClick={handleOpenSellModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>Sell</Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-around", marginTop:"20px"}}>
                <Box>
                    <Typography variant="h6">{numberWithCommas(data.marketCap)}</Typography>
                    <Typography variant="body1">Market Cap</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">0.95%</Typography>
                    <Typography variant="body1">Streaming Fee</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">September 9th 2022</Typography>
                    <Typography variant="body1">Inception Date</Typography>
                </Box>
            </Box>

            <Card sx={{marginTop:"20px", padding:"15px", backgroundColor:"rgba(255,255,255,0.75)", borderRadius:"16px"}}>
                
                <Typography variant="body1">Current Price</Typography>
                <Box sx={{display:"flex"}}>
                    <Typography variant="h2">
                        ${numberWithCommas(data.price)}
                        <span style={{fontSize:"16px", color:"#22AB94"}}>+1.9%</span>
                    </Typography>
                </Box>
                <MyLineChart/>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography sx={{color:"#9B97B3"}}>Token</Typography>
                    </Grid>
                    <Grid container item xs={9}>
                        {headers.map((header) => (
                            <Grid key={header} item xs={2.4}>
                                <Typography sx={{color:"#9B97B3"}}>{header}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Paper>
                    <Grid container sx={{padding:"15px"}}>
                        <Grid item xs={3}>
                            <Typography sx={{fontWeight:"bold"}}>DeFi Pulse Index</Typography>
                        </Grid>
                        <Grid container item xs={9}>
                            <Grid item xs={2.4}></Grid>
                            <Grid item xs={2.4}></Grid>
                            <Grid item xs={2.4}></Grid>
                            <Grid item xs={2.4}>
                                <Typography sx={{color:"#22AB94"}}>1.9%</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Typography sx={{fontWeight:"bold"}}>$70.41</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{backgroundColor:"#CECEFD"}}>
                        <Typography variant="body2" sx={{fontWeight:"bold", padding:"15px"}}>Underlying Index</Typography>
                    </Box>
                    {data.tokens.map((token,idx) => (
                        <Grid container key={idx} sx={{padding:"15px"}}>
                            <Grid item xs={3}>
                                <Typography sx={{fontWeight:"bold"}}>{token.name}</Typography>
                            </Grid>
                            <Grid container item xs={9}>
                                <Grid item xs={2.4} sx={{display:"flex"}}>
                                    <Typography>mock &nbsp;</Typography>
                                    <Typography sx={{color:"#82858A"}}>{token.symbol}</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography>$mock</Typography>
                                </Grid>
                                <Grid item xs={2.4}>{token.percent}%</Grid>
                                <Grid item xs={2.4}>
                                    <Typography>mock%</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography sx={{fontWeight:"bold"}}>$mock</Typography>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{backgroundColor: mockColorCurrency[token.symbol], width: `${token.percent}%`, height:"6px", borderRadius:"20px"}}
                            />
                        </Grid>
                    ))}
                </Paper>
            </Card>
            <BuyModal
                open={showBuyModal}
                onClose={handleCloseBuyModal}
                dcaModal={false}
            />
            <SellModal
                open={showSellModal}
                onClose={handleCloseSellModal}
            />
            <BuyModal
                open={showDCAModal}
                onClose={handleCloseDCAModal}
                dcaModal={true}
            />
        </Container>
    )
}

export default IndexDetail