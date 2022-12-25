import { Box, Card, Grid, Typography, Container, Paper, LinearProgress, SelectChangeEvent, Select, MenuItem, Link } from "@mui/material"
import React, { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { numberWithCommas } from "../utils/numberWithCommas";
import { mockColorCurrency } from "../constants/mockColorCurrency";
import { useNavigate } from "react-router-dom";
import MockIndex from "../constants/mockIndex";

const priceDownStyle = {
    backgroundColor:"#F23645",
    borderRadius:"5px",
    color:"white",
    padding:"10px",
    textAlign:"center",
}

const priceUpStyle = {
    backgroundColor:"#22AB94",
    borderRadius:"5px",
    color:"white",
    padding:"10px",
    textAlign:"center",
}


const data = MockIndex

const headers = [
    "Market Cap", "Price", "1 Day", "1 Week", "1 Month", "All-time"
]

const IndexTable = () => {
    const [currency, setCurrency] = useState<string>('USD')
    const navigate = useNavigate()

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value)
    }


    return (
        <Card sx={{marginTop: "20px", padding:"15px", backgroundColor:"rgba(255,255,255,0.75)", border:"2px solid", borderColor:"white"}}>
            <Select value={currency} onChange={handleCurrencyChange} IconComponent={ExpandMoreIcon} 
                sx={{float:"right", background:"white", borderRadius:"8px", borderColor:"white", color:"#82858A", border:"0"}}
            >
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
                {data.map((row, idx) => (
                    <Grid
                        container key={idx}
                        sx={{
                            padding:"15px", 
                            cursor:"pointer", 
                            '&:hover': { transform: 'scale(1.015)' }, transition: 'all 0.5s',
                        }}
                        // onClick={() => navigate(`indexDetail/${row.name}`)}
                        onClick={() => navigate(`indexDetail/${row.id}`)}
                    >
                        <Grid item xs={3}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{row.name}</Typography>
                            <Typography variant="h6">{row.shortName}</Typography>
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
                                    sx={
                                        (idx == 0)?
                                        {
                                            backgroundColor: mockColorCurrency[token.symbol], 
                                            width: `${token.percent}%`, 
                                            height: "6px",
                                            borderTopLeftRadius:"20px",
                                            borderBottomLeftRadius:"20px"
                                        } : (idx == row.tokens.length - 1) ?
                                        {
                                            backgroundColor: mockColorCurrency[token.symbol], 
                                            width: `${token.percent}%`, 
                                            height: "6px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        } : 
                                        {
                                            backgroundColor: mockColorCurrency[token.symbol], 
                                            width: `${token.percent}%`, 
                                            height: "6px",
                                        }
                                }
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