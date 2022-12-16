import { Button, Card, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react";
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { mockColorCurrency } from "../constants/mockColorCurrency";
import { numberWithCommas } from "../utils/numberWithCommas";
import BuyModal from "./Modal/BuyModal";
import SellModal from "./Modal/SellModal";

const UnderlyingTokens = [{ name: "BTC", percent: 50}, {name:"ETH", percent:25}, {name:"AVAX", percent:25}]

const headers = [
    "Quantity per Set", "Token Price", "Currnet Price Allocation", "Percent Change", "Total Price per Set"
]

const IndexDetail = () => {

    const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
    const handleOpenBuyModal = () =>{
        setShowBuyModal(true)
    }
    const handleCloseBuyModal = () =>{
        setShowBuyModal(false)
    }

    const [showSellModal, setShowSellModal] = useState<boolean>(false)
    const handleOpenSellModal = () =>{
        setShowSellModal(true)
    }
    const handleCloseSellModal = () =>{
        setShowSellModal(false)
    }


    return(
        <Container>
            <NavLink to="/" style={{textDecoration:"none" ,color:"#787485"}}>
                &lt; Back to Thematic Exposure Sets
            </NavLink>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography  variant="h4" sx={{fontWeight:"bold"}}>DeFi Pulse Index</Typography>
                <Box sx={{display:"flex"}}>
                    <Button variant="contained">DCA</Button>
                    <Button variant="contained" onClick={handleOpenBuyModal}>Buy</Button>
                    <Button variant="contained" onClick={handleOpenSellModal}>Sell</Button>
                </Box>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-around"}}>
                <Box>
                    <Typography variant="h6">{numberWithCommas(21211158.69)}</Typography>
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
                        $70.41
                        <span style={{fontSize:"16px", color:"#22AB94"}}>+1.9%</span>
                    </Typography>
                </Box>
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
                                <Typography sx={{color:"#22AB94"}}>2.06%</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Typography sx={{fontWeight:"bold"}}>$70.41</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{backgroundColor:"#CECEFD"}}>
                        <Typography variant="body2" sx={{fontWeight:"bold", padding:"15px"}}>Underlying Index</Typography>
                    </Box>
                    {UnderlyingTokens.map((token,idx) => (
                        <Grid container key={idx} sx={{padding:"15px"}}>
                            <Grid item xs={3}>
                                <Typography sx={{fontWeight:"bold"}}>{token.name}</Typography>
                            </Grid>
                            <Grid container item xs={9}>
                                <Grid item xs={2.4}>mock</Grid>
                                <Grid item xs={2.4}>mock</Grid>
                                <Grid item xs={2.4}>{token.percent}%</Grid>
                                <Grid item xs={2.4}>mock</Grid>
                                <Grid item xs={2.4}>mock</Grid>
                            </Grid>
                            <Box
                                sx={{backgroundColor: mockColorCurrency[token.name], width: `${token.percent}%`, height:"5px"}}
                            />
                        </Grid>
                    ))}
                </Paper>
            </Card>
            <BuyModal
                open={showBuyModal}
                onClose={handleCloseBuyModal}
            />
            <SellModal
                open={showSellModal}
                onClose={handleCloseSellModal}
            />
        </Container>
    )
}

export default IndexDetail