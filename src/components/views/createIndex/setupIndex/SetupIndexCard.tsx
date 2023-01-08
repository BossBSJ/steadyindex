import { Box, TextField, Typography } from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";

type IProps = {
    indexName: string
    setIndexName: Dispatch<SetStateAction<string>>
    indexSymbol: string
    setIndexSymbol: Dispatch<SetStateAction<string>>
    startPrice: string
    setStartPrice: Dispatch<SetStateAction<string>>
    streamingFee: string
    setStreamingFee: Dispatch<SetStateAction<string>>
    issuanceFee: string
    setIssuanceFee: Dispatch<SetStateAction<string>>
}

const SetupIndexCard = (props:IProps) => {
    const {
        indexName, indexSymbol, startPrice, streamingFee, issuanceFee,
        setIndexName, setIndexSymbol, setStartPrice, setStreamingFee, setIssuanceFee
    } = props

    // const [indexName, setIndexName] = useState<string>('');
    // const [indexSymbol, setIndexSymbol] = useState<string>('');
    // const [startPrice, setStartPrice] = useState<string>('')
    // const [streamingFee, setStreamingFee] = useState<string>('')
    // const [issuanceFee, setIssuanceFee] = useState<string>('')

    const handleChangeIndexName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexName(event.target.value);
    };

    const handleChangeIndexSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexSymbol(event.target.value);
    };

    const handleChangeStartPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartPrice(event.target.value);
    };

    const handleChangeStreamingFee = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStreamingFee(event.target.value);
    };

    const handleChangeIssuanceFee = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIssuanceFee(event.target.value);
    };
    

    return(
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Setup Your Index</Typography>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
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
            <Box sx={{py:"20px"}}>
                <Typography sx={{fontWeight:"bold"}}>Set Fees</Typography>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Box>
                        <Typography variant="body2">Streaming Fee</Typography>
                        <TextField
                            type="number"
                            placeholder="100.00"
                            value={streamingFee}
                            onChange={handleChangeStreamingFee}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2">Issuance Fee</Typography>
                        <TextField
                            type="number"
                            placeholder="100.00"
                            value={issuanceFee}
                            onChange={handleChangeIssuanceFee}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SetupIndexCard