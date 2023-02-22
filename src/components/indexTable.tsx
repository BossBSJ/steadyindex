import { Box, Card, Grid, Typography, Container, Paper, SelectChangeEvent, Select, MenuItem, Link, ButtonGroup, Button, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { numberWithCommas } from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { paletteColorCode, RouteName } from "../constants/constants";
import { IndexOnTable } from "../interfaces/indexOnTable.interface";

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

const headers = [
    // "Market Cap", "Price", "1 Day", "1 Week", "1 Month", "All-time"
    "Market Cap", "Price", "Asset Underlying"
]

type IProps = {
    index: IndexOnTable[] | undefined
    isMyPortPage: boolean
}

const IndexTable = (props: IProps) => {
    const { isMyPortPage, index } = props
    const navigate = useNavigate()
    const [currency, setCurrency] = useState<string>('USD')
    const [typeTable, setTypeTable] = useState<string>('All')

    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value)
    }

    const handleOnTypeTable = (_typeTable:string) =>{
        setTypeTable(_typeTable)
    }

    return (
        <Card sx={{marginTop: "20px", padding:"15px", backgroundColor:"rgba(255, 253, 251, 0.48)", border:"2px solid", borderColor:"white", marginBottom:"40px"}}>
            {/* <Box sx={{display:"flex", justifyContent:"space-between"}}>
                {isMyPortPage? <ButtonGroup sx={{borderRadius:"8px",}}>
                    <Button 
                        variant="text" 
                        sx={typeTable === 'All'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                        onClick={() => handleOnTypeTable('All')}
                    >
                        All Index
                    </Button>
                    <Button 
                        variant="text" 
                        sx={typeTable === 'My'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                        onClick={() => handleOnTypeTable('My')}
                    >                            
                        My Index
                    </Button>
                </ButtonGroup>:
                <Box></Box>
                }
            </Box> */}
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant="body1" sx={{color:"#82858A"}}>Name</Typography>
                </Grid>
                <Grid container item xs={9} spacing={3}>
                    {/* {headers.map((header) => (
                        <Grid key={header} item xs={3}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>{header}</Typography>
                        </Grid>
                    ))} */}
                    <Grid item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>Market Cap</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" sx={{color:"#82858A"}}>Price</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1" sx={{color:"#82858A"}}>Asset Underlying</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {index ? (
                <Paper sx={{backgroundColor:"rgba(255, 255, 255, 0.75)"}}>
                    {index?.map((row, idx) => (
                        <Grid
                            container
                            key={idx}
                            sx={{
                                padding:"15px", 
                                cursor:"pointer", 
                                '&:hover': { transform: 'scale(1.015)' }, transition: 'all 0.5s',
                            }}
                            onClick={() => navigate(`${RouteName.indexDetail}/${row.id}`)}
                        >
                            <Grid item xs={3}>
                                {row.name.length < 20?
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{row.name}</Typography>:
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{row.name.substring(0,20)}...</Typography>
                                }
                                <Typography variant="h6">{row.symbol}</Typography>
                            </Grid>
                            <Grid container item xs={9} spacing={3}>
                                <Grid item xs={2}>
                                    <Box>
                                        ${numberWithCommas(row.marketCap)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2} sx={{fontWeight:'bold'}}>
                                    <Box>
                                        ${numberWithCommas(row.price)}
                                    </Box>
                                </Grid>
                                {/* <Grid item xs={2}  >
                                    <Box sx={row.dayChange >= 0? priceUpStyle : priceDownStyle}>
                                        {row.dayChange >= 0? "+":""}{row.dayChange}%
                                    </Box>
                                </Grid>
                                <Grid item xs={2} >
                                    <Box sx={row.weekChange >= 0? priceUpStyle : priceDownStyle}>
                                        {row.weekChange >= 0? "+":""}{row.weekChange}%
                                    </Box>
                                </Grid>
                                <Grid item xs={2} >
                                    <Box sx={row.monthChange >= 0? priceUpStyle : priceDownStyle}>
                                        {row.monthChange >= 0? "+":""}{row.monthChange}%
                                    </Box>
                                </Grid>
                                <Grid item xs={2} >
                                    <Box sx={row.allTimeChange >= 0? priceUpStyle : priceDownStyle}>
                                        {row.allTimeChange >= 0? "+":""}{row.allTimeChange}%
                                    </Box>
                                </Grid> */}
                                <Grid item xs={8} sx={{display:"flex"}}>
                                {(row.components.slice(0,4)).map((token, idx) => (
                                    <Box key={idx} sx={{marginRight:"15px", display:"flex"}}>
                                        <img 
                                            src={`https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${token.address}/logo.png`}
                                            style={{width:"20px", height:"20px", borderRadius:"50%"}}
                                        />
                                        <Typography sx={{paddingLeft:"5px"}}>
                                            {token.symbol}{" "}{token.ratio.toFixed(2)}%
                                        </Typography>
                                    </Box>
                                ))}
                                {row.components.length > 4 && 
                                    <Typography>
                                        +{row.components.length - 4} more
                                    </Typography>}
                                </Grid>
                                <Grid item xs={12} sx={{display:"flex"}}>
                                    {(row.components).map((token,idx) => (
                                        <Box
                                        key={idx}
                                        sx={
                                            (idx === 0)?
                                            {
                                                backgroundColor: paletteColorCode[idx % 6], 
                                                width: `${token.ratio}%`, 
                                                height: "6px",
                                                borderTopLeftRadius:"20px",
                                                borderBottomLeftRadius:"20px"
                                            } : (idx === row.components.length - 1) ?
                                            {
                                                backgroundColor: paletteColorCode[idx % 6], 
                                                width: `${token.ratio}%`, 
                                                height: "6px",
                                                borderTopRightRadius:"20px",
                                                borderBottomRightRadius:"20px"
                                            } : 
                                            {
                                                backgroundColor: paletteColorCode[idx % 6], 
                                                width: `${token.ratio}%`, 
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
            ) : ( //styling skeleton
                <Skeleton animation="wave" variant="rounded" height={116}/>
            )}
        </Card>
    )
}

export default IndexTable;