import { Box, TextField, Typography } from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";

type IProps = {
    indexName: string
    setIndexName: Dispatch<SetStateAction<string>>
    indexSymbol: string
    setIndexSymbol: Dispatch<SetStateAction<string>>
    startPrice: string
    setStartPrice: Dispatch<SetStateAction<string>>
}

const SetupIndexCard = (props:IProps) => {
    const {
        indexName, indexSymbol, startPrice,
        setIndexName, setIndexSymbol, setStartPrice,
    } = props

    const handleChangeIndexName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexName(event.target.value);
    };

    const handleChangeIndexSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexSymbol(event.target.value);
    };

    const handleChangeStartPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartPrice(event.target.value);
    };
    
    return(
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Setup Your Index</Typography>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
                <Box sx={{py:"20px"}}>
                    <Typography>Index Name</Typography>
                    <TextField 
                        placeholder="e.g. Steady whale index"
                        value={indexName}
                        onChange={handleChangeIndexName}
                        sx={{width:"100%"}}
                    />
                </Box>
                <Box sx={{py:"20px"}}>
                    <Typography>Index Symbol</Typography>
                    <TextField 
                        placeholder="e.g. SWI"
                        value={indexSymbol}
                        onChange={handleChangeIndexSymbol}
                        sx={{width:"100%"}}
                    />
                </Box>
                <Box sx={{py:"20px"}}>
                    <Typography>Staring Price (USD)</Typography>
                    <TextField
                        type="number"
                        placeholder="100.00"
                        value={startPrice}
                        onChange={handleChangeStartPrice}
                        sx={{width:"100%"}}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default SetupIndexCard