import { Box, Button, Card, Input, LinearProgress, Typography } from "@mui/material"
import { useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading";


const DeployCard = () => {

    const mockTokenAllocation = [
        {name: "BTC", allocation: 30},
        {name: "BTC", allocation: 30},
        {name: "BTC", allocation: 30},
        {name: "BTC", allocation: 10}
    ]

    const [indexCover, setIndexCover] = useState<any>([])
    const handleChangeIndexCover = (imageList: ImageListType) => {
        setIndexCover(imageList as never[])
    }

    console.log(indexCover)

    return (
        <Box sx={{padding: "40px"}}>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Deploy smart contract</Typography>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Card sx={{padding:"16px", borderRadius:"16px"}}>
                        <Typography sx={{fontWeight:"bold"}}>Name</Typography>
                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                            <Typography>Symbol</Typography>
                            <Typography sx={{fontWeight:"bold"}}>${100}</Typography>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"column"}}>
                            <Typography variant="caption" sx={{fontWeight:"bold"}}>Owner Address</Typography>
                            <Typography variant="caption" sx={{color:"gray"}}>0x75Aa63D42AA56F08F42aa5deB8d5892358D942c1</Typography>
                        </Box>
                    </Card>

                    <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                        <Typography variant="caption">Streming Fee</Typography>
                        <Typography variant="caption">{10}%</Typography>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                        <Typography variant="caption">Issuance Fee</Typography>
                        <Typography variant="caption">{5}%</Typography>
                    </Box>
                </Box>
                
                <Card sx={{padding:"16px", borderRadius:"16px"}}>
                    <ImageUploading
                        value={indexCover}
                        onChange={handleChangeIndexCover}
                    >
                        {({imageList, onImageUpload, isDragging, dragProps}) => (
                            <Box>
                                <Button
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Drag {'&'} Drop or browse your index cover
                                </Button>
                                {imageList.map((image, index) => (
                                    <Box key={index}>
                                        <img src={image.dataURL} alt="" width="100" />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </ImageUploading>
                </Card>
            </Box>
            <Box>
                {mockTokenAllocation.map((token:any, idx:number) => (
                    <Box key={idx}>
                        <Typography>{token.name}</Typography>
                        <Typography>{token.allocation} %</Typography>
                        <LinearProgress variant="determinate" value={token.allocation}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default DeployCard