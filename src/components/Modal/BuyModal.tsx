import styled from "@emotion/styled";
import { Button, ButtonGroup, Card, InputBase, Modal, Paper, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent, useEffect, useState } from "react";

type IProps = {
    open: boolean
    onClose: () => void
}


const BuyModal = (props: IProps) => {
    const { open, onClose } = props
    const [checked, setChecked] = useState(false);

    const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{width:"30vw", height:"40vh", padding: "20px", borderRadius:"16px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>Buy</Typography>
                <Typography variant="caption">Receive</Typography>
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
                    <Typography variant="caption">Pay</Typography>
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
                <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                    <Typography>DCA With DPI</Typography>
                    <Switch
                        onChange={handleChangeSwitch}
                    />
                </Box>
                {checked?
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <ButtonGroup variant="contained">
                        <Button>Day</Button>
                        <Button>Weekly</Button>
                        <Button>Monthly</Button>
                    </ButtonGroup>
                </Box> : ""}
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Button onClick={onClose} variant="contained">BUY DPI</Button>
                </Box>
            </Card>
        </Modal>
    )
}

export default BuyModal

