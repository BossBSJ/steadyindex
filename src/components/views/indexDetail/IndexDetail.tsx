import { Button, Card, Container, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import theme from "../../../theme";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import BuyModal from "../../Modal/BuyModal";
import SellModal from "../../Modal/SellModal";
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    Legend,
} from "recharts";
import { useIndexDetail } from "../../../hooks/useIndexDetail";
import { IndexOnTable } from "../../../interfaces/indexOnTable.interface"
import { mockColorCurrency } from "../../../constants/mock";
import { paletteColorCode } from "../../../constants/constants";

const headers = [
    "Quantity per Set", "Token Price", "Current Alloc / Strategic Alloc", "1 Day Percent Change", "Total Price per Set"
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
        price: 500
    },
]



const MyAreaChart = () => {

    const areaColor = "rgba(0, 95, 255, 0.5)"

    const CustomToolTip = ({ active, payload, label }: any) => {
        if(active && payload && payload.length){
            return(
                <Box sx={{padding: "10px", borderRadius:"10.5px", backgroundColor:"#005FFF", color:"white"}}>
                    <Typography>{payload[0].value}</Typography>
                </Box>
            )
        }
        return null
    }

    return(
        <AreaChart
            width={1123}
            height={300}
            data={mockHistoryPrice}
            
        >
            <XAxis dataKey="date" />
            {/* <Tooltip content={<CustomToolTip/>}/> */}
            <Tooltip/>
            <Legend />
            <Area
                type="monotone"
                dataKey="price"
                stroke={areaColor}
                fill={areaColor}
                activeDot={{ r: 3 }}
            />
        </AreaChart>
    )
}

const priceUpStyle = {
    color: "#22AB94"
}

const priceDownStyle = {
    color: "#DF4857"
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

    const { index, componentPercentChange } = useIndexDetail(Number(indexId))

    const [data, setData] = useState<IndexOnTable | undefined>(index)
    const [componentPriceChange, setComponentPriceChange] = useState<number[] | undefined>()

    useEffect(() => {
        setData(index)
        setComponentPriceChange(componentPercentChange)
    },[index, componentPercentChange])

    return(
        <Container sx={{marginTop:"40px", marginBottom:"40px",}}>
            <NavLink to="/" style={{textDecoration:"none" ,color:"#787485"}}>
                &lt; Back to Thematic Exposure Sets 
            </NavLink>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                {data ? (
                    <Typography  variant="h4" sx={{fontWeight:"bold"}}>{data?.name}</Typography>
                ) : (
                    <Skeleton animation="wave" variant="rounded" width={230} height={60}/>
                )}
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    {data? (
                    <Button variant="contained" onClick={handleOpenDCAModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>DCA</Typography>
                    </Button>) : (
                        <Skeleton animation="wave" variant="rounded" sx={{marginRight:"20px"}} width={110} height={60}/>
                    )}
                    {data? (
                    <Button variant="contained" onClick={handleOpenBuyModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>Buy</Typography>
                    </Button>) : (
                        <Skeleton animation="wave" variant="rounded" sx={{marginRight:"20px"}} width={110} height={60}/>
                    )}
                    {data? (
                    <Button variant="contained" onClick={handleOpenSellModal} sx={{marginRight:"20px", width:"110px"}}>
                        <Typography sx={{fontWeight:"bold"}}>Sell</Typography>
                    </Button>) : (
                        <Skeleton animation="wave" variant="rounded" sx={{marginRight:"20px"}} width={110} height={60}/>
                    )}
                </Box>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-around", py:"20px"}}>
                {data? (
                    <Box>
                        <Typography variant="h6">{numberWithCommas(data?.marketCap)}</Typography>
                        <Typography variant="body1">Market Cap</Typography>
                    </Box>
                ) : (
                    <Skeleton animation="wave" variant="rounded" width={150} height={60}/>
                )}
                {data? (
                    <Box>
                        <Typography variant="h6">September 9th 2022</Typography>
                        <Typography variant="body1">Inception Date</Typography>
                    </Box>
                ) : (
                    <Skeleton animation="wave" variant="rounded" width={150} height={60}/>
                )}
            </Box>

            {data && componentPriceChange? (
                <Card sx={{padding:"15px", backgroundColor:"rgba(255,255,255,0.75)", borderRadius:"16px", border:"2px solid", borderColor:"white",}}>
                    <Typography variant="body1">Current Price</Typography>
                    <Box sx={{display:"flex"}}>
                        <Typography variant="h2">
                            ${numberWithCommas(data?.price)}
                            <span style={{fontSize:"16px", color:"#22AB94"}}>+1.9%</span>
                        </Typography>
                    </Box>
                    <MyAreaChart/>
                    <Grid container sx={{marginTop: '20px'}}>
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
                                <Typography sx={{fontWeight:"bold"}}>{data?.name}</Typography>
                            </Grid>
                            <Grid container item xs={9}>
                                <Grid item xs={2.4}></Grid>
                                <Grid item xs={2.4}></Grid>
                                <Grid item xs={2.4}></Grid> 
                                <Grid item xs={2.4}>
                                    <Typography sx={{color:"#22AB94"}}>mock%</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography sx={{fontWeight:"bold"}}>${numberWithCommas(index?.price)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{backgroundColor:theme.palette.secondary.light, height:"29px", display:"flex", alignItems:"center"}}>
                            <Typography variant="body2" sx={{fontWeight:"bold", padding:"15px", color:"gray"}}>Underlying Index</Typography>
                        </Box>
                        {data?.components.map((token,idx) => (
                            <Grid container key={idx} sx={{padding:"15px"}}>
                                <Grid item xs={3}>
                                    <Box sx={{display:"flex"}}>
                                        <img 
                                            src={`https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${token.address}/logo.png`}
                                            style={{width:"20px", height:"20px", borderRadius:"50%"}}
                                        />
                                        <Typography sx={{fontWeight:"bold", paddingLeft: "20px"}}>
                                            {token.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid container item xs={9}>
                                    <Grid item xs={2.4} sx={{display:"flex"}}>
                                        <Typography>{token.unit.toFixed(2)} &nbsp;</Typography>
                                        <Typography sx={{color:"#82858A"}}>{token.symbol}</Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography>
                                            ${numberWithCommas(token.price)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography>
                                            {token.ratio.toFixed(2)}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography sx={componentPriceChange?.[idx] >= 0 ? priceUpStyle : priceDownStyle}>
                                            {componentPriceChange?.[idx].toFixed(2)}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography sx={{fontWeight:"bold"}}>
                                            ${numberWithCommas(token.pricePerSet)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{backgroundColor: paletteColorCode[idx % 6], width: `${token.ratio}%`, height:"6px", borderRadius:"20px"}}
                                />
                            </Grid>
                        ))}
                    </Paper>
                </Card>
            ) : (
                <Skeleton animation="wave" variant="rounded" height={600}/>
            )}
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