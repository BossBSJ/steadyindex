import styled from "@emotion/styled";
import { Button, ButtonGroup, Card, CardHeader, InputBase, MenuItem, Modal, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent, useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme";

type IProps = {
    open: boolean
    onClose: () => void
    dcaModal: boolean
}

const BuyModal = (props: IProps) => {
    const { open, onClose, dcaModal } = props
    const [checked, setChecked] = useState<boolean>(dcaModal);

    const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    const [currency, setCurrency] = useState<string>('USD')
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value)
    }

    const [periodDCA, setPeriodDCA] = useState<string>('')
    const handleChoosePeriod = (plan:string) => {
        if(periodDCA == plan){
            setPeriodDCA('')
        }else {
            setPeriodDCA(plan)
        }
        
    }

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{backgroundColor:"#F3F3FF",width:"25vw", padding: "20px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>
                    {/* {dcaModal? "But with DCA":"Buy"} */}
                    Buy
                </Typography>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <Box>
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
                    </Box>
                <Box>
                    <Typography variant="caption">Pay</Typography>
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
                </Box>
                <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold"}}>DCA With DPI</Typography>
                    <Switch
                        checked={checked}
                        onChange={handleChangeSwitch}
                    />
                </Box>
                {checked &&
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <ButtonGroup sx={{borderRadius:"8px",}}>
                        <Button 
                            variant="text" 
                            sx={periodDCA == 'Day'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                            onClick={() => handleChoosePeriod('Day')}
                        >
                            Day
                        </Button>
                        <Button 
                            variant="text" 
                            sx={periodDCA == 'Weekly'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                            onClick={() => handleChoosePeriod('Weekly')}
                        >                            
                            Weekly
                        </Button>
                        <Button 
                            variant="text" 
                            sx={periodDCA == 'Monthly'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                            onClick={() => handleChoosePeriod('Monthly')}
                        >                            
                            Monthly
                        </Button>
                    </ButtonGroup>
                </Box>
                }
                {periodDCA != '' && checked &&
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Deposit to our vault</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <TextField
                                type="number"
                                placeholder="0.0"
                                inputProps={{
                                    sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                                }}
                        />
                        <Typography>est. 3.2 {periodDCA}</Typography>
                    </Box>
                </Box>}
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Button onClick={onClose} variant="contained" sx={{width:"320px"}}>
                        <Typography sx={{fontWeight:"bold"}}>BUY DPI</Typography>
                        
                    </Button>
                </Box>
                </Box>
            </Card>
        </Modal>
    )
}

export default BuyModal