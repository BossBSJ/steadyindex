import { Box, Card, Grid, Typography, Container, Paper, LinearProgress, SelectChangeEvent, Select, MenuItem, Link } from "@mui/material"
import React, { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { numberWithCommas } from "../utils/numberWithCommas";
import { mockColorCurrency } from "../constants/mockColorCurrency";
import { useNavigate } from "react-router-dom";

const priceDownStyle = {
    backgroundColor:"#F23645",
    borderRadius:"10px",
    color:"white",
    padding:"10px",
    textAlign:"center",
}

const priceUpStyle = {
    backgroundColor:"#22AB94",
    borderRadius:"10px",
    color:"white",
    padding:"10px",
    textAlign:"center",
}

function createData(
    id: number,
    name: string,
    marketCap: number,
    price: number,
    dayChange: number,
    weekChange: number,
    monthChange: number,
    allTimeChange: number,
    tokens: Array<{name: string, percent: number}>,
){
    return {id, name, marketCap, price, dayChange, weekChange, monthChange, allTimeChange, tokens}
}


const rows = [
    createData(1, 'DeFi Pulse Index', 21202121, 70.38, 1.9, -0.5, -0.8, -75.4, [{ name: "BTC", percent: 50}, {name:"ETH", percent:25}, {name:"AVAX", percent:25}]),
    createData(2, 'Sushi DAO House', 100000, 6.58, 2.0, -0.1, 1.2, -55.5, [{name:"BTC", percent:50}, {name:"ETH", percent:20}, {name:"AVAX", percent:15}, {name:"BNB", percent:15}]),
    createData(3, 'Bankless BED Index', 100000, 44.83, 2.5, 0.5, 0, -68.7, [{name:"BTC", percent:60}, {name:"ETH", percent:40}]),
]

const headers = [
    "Market Cap", "Price", "1 Day", "1 Week", "1 Month", "All-time"
]

const IndexTable = () => {
    const [currency, setCurrency] = useState<string>('USD')
    const navigate = useNavigate()

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value)
    }

    const handleOnClickIndex = () => {
        navigate(`indexDetail`)
    }

    return (
        <Card sx={{marginTop: "20px", padding:"15px", backgroundColor:"rgba(255,255,255,0.75)", borderRadius:"16px"}}>
            <Select value={currency} onChange={handleCurrencyChange} IconComponent={ExpandMoreIcon} sx={{float:"right"}}>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"ETH"}>ETH</MenuItem>
                <MenuItem value={"BTC"}>BTC</MenuItem>
            </Select>
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant="body1" sx={{color:"#82858A"}}>Name</Typography>
                </Grid>
                <Grid container item xs={9}>
                    {headers.map((header) => (
                        <Grid key={header} item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>{header}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Paper>
                {rows.map((row, idx) => (
                    <Grid
                        container key={idx}
                        sx={{
                            padding:"15px", 
                            cursor:"pointer", 
                            '&:hover': { transform: 'scale(1.015)' }, transition: 'all 0.5s'}}
                            onClick={handleOnClickIndex}
                    >
                        <Grid item xs={3}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{row.name}</Typography>
                        </Grid>
                        <Grid container item xs={9}>
                            <Grid item xs={2}>${numberWithCommas(row.marketCap)}</Grid>
                            <Grid item xs={2} sx={{fontWeight:'bold'}}>${numberWithCommas(row.price)}</Grid>
                            <Grid item xs={2} sx={row.dayChange >= 0? priceUpStyle : priceDownStyle} >
                                {row.dayChange >= 0? "+":""}{row.dayChange}%
                            </Grid>
                            <Grid item xs={2} sx={row.weekChange >= 0? priceUpStyle : priceDownStyle}>
                                {row.weekChange >= 0? "+":""}{row.weekChange}%
                            </Grid>
                            <Grid item xs={2} sx={row.monthChange >= 0? priceUpStyle : priceDownStyle}>
                                {row.monthChange >= 0? "+":""}{row.monthChange}%
                            </Grid>
                            <Grid item xs={2} sx={row.allTimeChange >= 0? priceUpStyle : priceDownStyle}>
                                {row.allTimeChange >= 0? "+":""}{row.allTimeChange}%
                            </Grid>
                            {(row.tokens).map((token, idx) => (
                                <Box key={idx} sx={{margin:"5px"}}>{token.name}{" "}{token.percent}%</Box>
                            ))}
                            <Grid item xs={12} sx={{display:"flex"}}>
                                {(row.tokens).map((token,idx) => (
                                    <Box
                                    key={idx}
                                    sx={{backgroundColor: mockColorCurrency[token.name], width: `${token.percent}%`, height: "5px"}}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </Card>
    )
}

export default IndexTable;