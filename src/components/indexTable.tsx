import { Box, Card, Grid, Typography, Container, Paper, SelectChangeEvent, Select, MenuItem, Link, ButtonGroup, Button, Skeleton } from "@mui/material"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { numberWithCommas } from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { DCA_MANAGER_CONTRACT_ADDRESS, paletteColorCode, RouteName } from "../constants/constants";
import { IndexOnTable } from "../interfaces/indexOnTable.interface";
import theme from "../theme";
import { Investment } from "../interfaces/investment.interface";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { prepareWriteContract, writeContract, Address } from "@wagmi/core";
import { DCA_MANAGER_CONTRACT_ABI } from "../constants/abi";
import { ethers } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useInvestment } from "../hooks/useInvestment";


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

//typeTable, setTypeTable
type IProps = {
    createdIndex: IndexOnTable[] | undefined
    holdIndex?: IndexOnTable[] | undefined
    isMyPortPage: boolean
    typeTable?: string
    setTypeTable: Dispatch<SetStateAction<string>>
}

const IndexTable = (props: IProps) => {
    const { isMyPortPage, createdIndex, typeTable, setTypeTable, holdIndex, } = props
    const navigate = useNavigate()

    const [accountAddress, setAccountAddress] = useState<Address>()
    const [investment, setInvestment] = useState<Investment[]>()
    const [index, setIndex] = useState<IndexOnTable[] | undefined>(holdIndex)
    const [hashUnsubcription, setHashUnsubscription] = useState<Address>()
    

    const getAccountAddress = useAccount()
    useEffect(() => {
        if(!getAccountAddress) return
        setAccountAddress(getAccountAddress.address)
    }, [getAccountAddress])

    const getInvestmentIndex = useInvestment(accountAddress)
    useEffect(() => {
        if(!getInvestmentIndex) return
        setInvestment(getInvestmentIndex.investmentIndex)
    },[getInvestmentIndex])


    useEffect(() => {
        if(!holdIndex && typeTable !== "Investment")
            setIndex(createdIndex)
        else if(typeTable !== "Investment") {
            setIndex(holdIndex)
        }

    },[holdIndex, createdIndex])


    const handleOnTypeTable = (_typeTable:string) =>{
        setTypeTable(_typeTable)
        if(_typeTable === 'Created'){
            setIndex(createdIndex)
        }
        else if(_typeTable === 'Wallet'){
            setIndex(holdIndex)
        }
        else if(_typeTable === 'Investment'){
            setIndex([])
        }
    }

    const handleUnsubscipt = async (idx:number) => {
        const _idx = ethers.BigNumber.from(idx)
        const config = await prepareWriteContract({
            address: DCA_MANAGER_CONTRACT_ADDRESS,
            abi: DCA_MANAGER_CONTRACT_ABI,
            functionName: "unsubscription",
            args: [_idx]
        })
        const data = await writeContract(config)
        setHashUnsubscription(data.hash)
    }
    const waitingApproveUsdc = useWaitForTransaction({
        hash: hashUnsubcription,
        onSuccess(data){
            console.log(data)
            window.location.reload()
        },
        enabled: hashUnsubcription !== undefined
    })

    return (
        <Card sx={{marginTop: "20px", padding:"15px", backgroundColor:"rgba(255, 253, 251, 0.48)", border:"2px solid", borderColor:"white", marginBottom:"40px"}}>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                {isMyPortPage? <ButtonGroup sx={{borderRadius:"8px",}}>
                    <Button 
                        variant="text" 
                        sx={typeTable === 'Wallet'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                        onClick={() => handleOnTypeTable('Wallet')}
                    >                            
                        My Wallet
                    </Button>
                    <Button 
                        variant="text" 
                        sx={typeTable === 'Created'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                        onClick={() => handleOnTypeTable('Created')}
                    >
                        Created Index
                    </Button>
                    <Button 
                        variant="text" 
                        sx={typeTable === 'Investment'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                        onClick={() => handleOnTypeTable('Investment')}
                    >                            
                        My Investment
                    </Button>
                </ButtonGroup>:
                <Box></Box>
                }
            </Box>
            {typeTable !== "Investment"? (
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant="body1" sx={{color:"#82858A"}}>Name</Typography>
                </Grid>
                <Grid container item xs={9} spacing={3}>
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
            ) : (
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="body1" sx={{color:"#82858A"}}>Name</Typography>
                    </Grid>
                    <Grid container item xs={9} spacing={3}>
                        <Grid item xs={2}>
                                <Typography variant="body1" sx={{color:"#82858A"}}>Market Cap</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>Price</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>Port Value</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>Invest/Period</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={{color:"#82858A"}}>Periods</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
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
                                {row.name.length <= 20?
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
                <Skeleton animation="wave" variant="rounded" height={100}/>
            )}
            {typeTable === "Investment"? (
                <Paper sx={{backgroundColor:"rgba(255, 255, 255, 0.75)"}}>
                    {investment?.map((item, idx) => (
                        <Grid 
                            container 
                            key={idx} 
                            sx={{
                                padding:"15px", 
                                '&:hover': { transform: 'scale(1.015)' }, transition: 'all 0.5s',
                            }}
                        >
                            <Grid item xs={3}>
                                {item.index?.name.length <= 20
                                    ?<Typography variant="h6" sx={{fontWeight: 'bold'}}>{item.index?.name}</Typography>
                                    :<Typography variant="h6" sx={{fontWeight: 'bold'}}>{item.index?.name.substring(0,20)}...</Typography>
                                }
                                {/* <Typography variant="h6" sx={{fontWeight: 'bold'}}>{item.index?.name}</Typography> */}
                                <Typography variant="h6">{item.index?.symbol}</Typography>
                            </Grid>
                            <Grid container item xs={9} spacing={3}>
                                <Grid item xs={2}>
                                    <Box>
                                        ${numberWithCommas(item.index?.marketCap)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2} sx={{fontWeight:'bold'}}>
                                    <Box>
                                        ${numberWithCommas(item.index?.price)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        ${numberWithCommas(item.portValue)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        ${numberWithCommas(item.investPerPeriod)}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        {item.period}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <DeleteOutlineIcon 
                                        onClick={() => {handleUnsubscipt(idx)}}
                                        sx={{cursor:"pointer", color:"gray"}}
                                    />
                                </Grid>
                                <Grid item xs={8} sx={{display:"flex"}}>
                                {(item.index.components.slice(0,4)).map((token, idx) => (
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
                                {item.index.components.length > 4 && 
                                    <Typography>
                                        +{item.index.components.length - 4} more
                                    </Typography>}
                                </Grid>
                                <Grid item xs={12} sx={{display:"flex"}}>
                                    {(item.index?.components).map((token,idx) => (
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
                                            } : (idx === item.index.components.length - 1) ?
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
            ) : (
                <Box></Box>
            )}
        </Card>
    )
}

export default IndexTable;