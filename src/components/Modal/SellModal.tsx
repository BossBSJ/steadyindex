import styled from "@emotion/styled";
import { Button, Card, InputBase, MenuItem, Modal, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type IProps = {
    open: boolean
    onClose: () => void
}


const SellModal = (props: IProps) => {

    const { open, onClose } = props
    const [currency, setCurrency] = useState<string>('USD')
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value)
    }

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{backgroundColor:"#F3F3FF",width:"25vw", height:"40vh", padding: "20px", borderRadius:"16px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>Sell</Typography>
                <Typography variant="caption">Sell</Typography>
                <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                    <Typography>DPI</Typography>
                    <TextField
                        type="number"
                        placeholder="0.0"
                        inputProps={{
                            sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                        }}
                    />
                </Box>
                    <Typography variant="caption">Recieve</Typography>
                <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                    <Select value={currency} onChange={handleCurrencyChange} IconComponent={ExpandMoreIcon} variant="standard"
                            sx={{float:"right", background:"white", borderRadius:"8px", backgroundColor:"#F3F3FF"}}
                        >
                        <MenuItem value={"USD"}>
                            <Typography>USD</Typography>
                        </MenuItem>
                        <MenuItem value={"ETH"}>
                            <Typography>BTC</Typography>
                        </MenuItem>
                        <MenuItem value={"BTC"}>
                            <Typography>ETH</Typography>
                        </MenuItem>
                    </Select>
                    <TextField
                        type="number"
                        placeholder="0.0"
                        inputProps={{
                            sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                        }}
                    />
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Button onClick={onClose} variant="contained">SELL DPI</Button>
                </Box>
            </Card>
        </Modal>
    )
}

export default SellModal
