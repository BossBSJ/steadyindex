import styled from "@emotion/styled";
import { Button, Card, InputBase, Modal, Paper, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";

type IProps = {
    open: boolean
    onClose: () => void
}


const SellModal = (props: IProps) => {

    const { open, onClose } = props
    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{width:"30vw", height:"40vh", padding: "20px", borderRadius:"16px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)"}}>
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
                    <Typography>ETH</Typography>
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
