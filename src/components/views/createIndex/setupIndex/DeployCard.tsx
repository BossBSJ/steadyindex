import { Box, Button, Card, Grid, Input, LinearProgress, Typography } from "@mui/material"
import { useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Token } from "../../../../interfaces/token.interface";

const mockTokenAllocation = [
    {name: "A", allocation: 30},
    {name: "B", allocation: 30},
    {name: "C", allocation: 30},
    {name: "D", allocation: 10}
]

type IProps = {
    indexName: string
    indexSymbol: string
    startPrice: string
    streamingFee: string
    issuanceFee: string
    tokenList: Token[]
}

const DeployCard = (props: IProps) => {

    const {indexName, indexSymbol, startPrice, streamingFee, issuanceFee, tokenList} = props

    return (
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Deploy smart contract</Typography>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Card sx={{padding:"16px", borderRadius:"16px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold"}}>{indexName}</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography>{indexSymbol}</Typography>
                        <Typography sx={{fontWeight:"bold"}}>${startPrice}</Typography>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="caption" sx={{fontWeight:"bold"}}>Owner Address</Typography>
                        <Typography variant="caption" sx={{color:"gray"}}>0x75Aa63D42AA56F08F42aa5deB8d5892358D942c1</Typography>
                    </Box>
                </Card>
                
                <Card sx={{padding:"10px", width:"123px"}}>
                    <Box sx={{border: 1,borderStyle:"dashed", borderRadius:"16px", borderColor:"#666666", display:"flex", flexDirection:"column", textAlign:"center", alignItems:"center"}}>
                        <MonetizationOnIcon sx={{fontSize:"46px", color:"#666666"}}/>
                        <Typography variant="caption" sx={{color:"gray"}}>
                            Drag {'&'} Drop or browse your index cover
                        </Typography>
                    </Box>
                    {/* <Input type="file" /> */}
                </Card>
            </Box>
            {/* <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                <Typography variant="caption">Streming Fee</Typography>
                <Typography variant="caption">{10}%</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                <Typography variant="caption">Issuance Fee</Typography>
                <Typography variant="caption">{5}%</Typography>
            </Box> */}
            <Grid container sx={{padding:"0 15px 0 15px"}}>
                <Grid item xs={6.5}>
                    <Typography variant="caption">Streming Fee</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="caption">{streamingFee}%</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{padding:"0 15px 0 15px"}}>
                <Grid item xs={6.5}>
                    <Typography variant="caption">Issuance Fee</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="caption">{issuanceFee}%</Typography>
                </Grid>
            </Grid>
            <Box sx={{padding:"20px", overflow:"auto", maxHeight:"400px"}}>
                {tokenList.map((token:any, idx:number) => (
                    <Box key={idx} sx={{display:"flex", margin:"15px 0 15px 0"}}>
                        <img
                            src={token.asset?.logoURI}
                            style={{width:"45px", height:"45px", borderRadius:"50%"}}
                        />
                        <Box sx={{width:"100%"}}>
                            <Typography>{token.asset?.name}</Typography>
                            <Typography>{token.allocation} %</Typography>
                            <LinearProgress variant="determinate" value={token.allocation}/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default DeployCard