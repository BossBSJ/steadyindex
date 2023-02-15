import { Box, Button, Card, Grid, Input, LinearProgress, Typography } from "@mui/material"
import React, { useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ComponentList } from "../../../../interfaces/component.interface";

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
    componentList: ComponentList[]
    onwerAddress: `0x${string}`| undefined
}

const DeployCard = (props: IProps) => {

    const {indexName, indexSymbol, startPrice, streamingFee, issuanceFee, componentList, onwerAddress} = props
    const [pictureToken, setPictureToken] = useState<any>(undefined)
    
    const handleChangePicture = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files?.[0]) return
        setPictureToken(URL.createObjectURL(event.target.files?.[0]))
    }


    return (
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Deploy smart contract</Typography>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Card sx={{padding:"16px", borderRadius:"16px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold"}}>{indexName}</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography>{indexSymbol}</Typography>
                        <Typography sx={{fontWeight:"bold"}}> ${startPrice}</Typography>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="caption" sx={{fontWeight:"bold"}}>Owner Address</Typography>
                        <Typography variant="caption" sx={{color:"gray"}}>{onwerAddress}</Typography>
                    </Box>
                </Card>
                
                <Card sx={{padding:"10px", width:"123px"}}>
                    {/* <Box sx={{border: 1,borderStyle:"dashed", borderRadius:"16px", borderColor:"#666666", display:"flex", flexDirection:"column", textAlign:"center", alignItems:"center"}}>
                        <MonetizationOnIcon sx={{fontSize:"46px", color:"#666666"}}/>
                        <Typography variant="caption" sx={{color:"gray"}}>
                            Drag {'&'} Drop or browse your index cover
                        </Typography>
                    </Box> */}
                    <input type="file" accept="image/*" onChange={handleChangePicture}/>
                    <img src={pictureToken} style={{width:"70px"}}/>
                </Card>
            </Box>
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
                {componentList.map((component, idx:number) => (
                    <Box key={idx} sx={{display:"flex", margin:"15px 0 15px 0"}}>
                        <img
                            src={component.asset?.logoURI}
                            style={{width:"45px", height:"45px", borderRadius:"50%"}}
                        />
                        <Box sx={{width:"100%", marginLeft:"10px"}}>
                            <Typography>{component.asset?.name}</Typography>
                            <Typography>{component.allocation} %</Typography>
                            <LinearProgress variant="determinate" value={component.allocation}/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default DeployCard