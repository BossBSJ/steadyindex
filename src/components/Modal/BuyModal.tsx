
import { Button, ButtonGroup, Card, CardHeader, InputBase, MenuItem, Modal, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent, useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../theme";
import { IndexOnTable } from "../../interfaces/indexOnTable.interface";
import { Address, erc20ABI, useAccount, useBalance, useContractRead, useWaitForTransaction } from "wagmi";
import { readContract, prepareWriteContract, writeContract, fetchBalance } from '@wagmi/core'
import { CONTROLLER_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "../../constants/constants";
import { CONTROLLER_CONTRACT_ABI } from "../../constants/abi";
import { ethers } from "ethers";
import { LoadingButton } from "@mui/lab";


type IProps = {
    open: boolean
    onClose: () => void
    dcaModal: boolean
    index?: IndexOnTable
}

const BuyModal = (props: IProps) => {
    const { open, onClose, dcaModal, index } = props
    const [checked, setChecked] = useState<boolean>(dcaModal);
    const [periodDCA, setPeriodDCA] = useState<string>('')

    const [amountIndexBuy, setAmountIndexBuy] = useState<number>(0)
    const [amountUSDCBuy, setAmountUSDCBuy] = useState<number>(0)

    const [address, setAddress] = useState<Address>()
    const [usdcBalance, setUsdcBalance] = useState<number>()
    const [checkApprove, setCheckApprove] = useState<boolean>(false)

    const [hashApprove, setHashApprove] = useState<Address>()
    const [hashBuy, setHashBuy] = useState<Address>()

    const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    const handleChoosePeriod = (plan:string) => {
        if(periodDCA === plan){
            setPeriodDCA('')
        }else {
            setPeriodDCA(plan)
        }
    }

    const handleChangeAmountIndexBuy = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmountIndexBuy(+event.target.value)
    }

    useEffect(() => {
        if(!index) return
        setAmountUSDCBuy(index?.price * amountIndexBuy)

    }, [amountIndexBuy])

    // const handleChangeAmountUSDCBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAmountUSDCBuy(+event.target.value)
    // }

    //approve usdc for buying index
    const handleApproveUsdc = async () => {
        const maxInt = ethers.BigNumber.from(2).pow(256).sub(1)

        const config = await prepareWriteContract({
            address: USDC_CONTRACT_ADDRESS,
            abi: erc20ABI,
            functionName: "approve",
            args: [CONTROLLER_CONTRACT_ADDRESS, maxInt],
        })

        const data = await writeContract(config)

        setHashApprove(data.hash)
    }

    const waitingApproveUsdc = useWaitForTransaction({
        hash: hashApprove,
        onSuccess(){
            setCheckApprove(true)
        },
        enabled: hashApprove !== undefined
    })

    //buy index
    const handleBuyIndex = async () => {
        const _amountIndexBuy = ethers.utils.parseUnits(String(amountIndexBuy), 18)

        if(!index?.address || !address) return
        const config = await prepareWriteContract({
            address: CONTROLLER_CONTRACT_ADDRESS,
            abi: CONTROLLER_CONTRACT_ABI,
            functionName:"issueIndexToken",
            args: [index?.address, _amountIndexBuy, USDC_CONTRACT_ADDRESS, address]
        })

        const data = await writeContract(config)
        setHashBuy(data.hash)
    }

    const waitingBuyIndex = useWaitForTransaction({
        hash: hashBuy,
        onSuccess(data){
            console.log(data)
            getUsdcBalance()
        },
        enabled: hashBuy !== undefined
    })

    // get balance USDC
    const getAddress = useAccount()
    useEffect(() => {
        if(!getAddress) return
        setAddress(getAddress.address)
    }, [getAddress])

    const getUsdcBalance = async () => {
        if(!address || !index) return
        const indexBalance = await fetchBalance({
            address: address,
            token: USDC_CONTRACT_ADDRESS
        })
        setUsdcBalance(Number(indexBalance.formatted))
    }
    useEffect(() => {
        getUsdcBalance()
    },[address, hashBuy, index])

    // check allowance
    useEffect(() => {
        if(!address) return
        const checkAllowance = async () => {
            const allowance = await readContract({
                address: USDC_CONTRACT_ADDRESS,
                abi: erc20ABI,
                functionName: "allowance",
                args: [address , CONTROLLER_CONTRACT_ADDRESS]
            })
            if(Number(allowance._hex) > 0)
                setCheckApprove(true)
            else
                setCheckApprove(false)
        }
        checkAllowance()
    }, [address])

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{backgroundColor:"#F3F3FF", padding: "20px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", minHeight:"40vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>Buy</Typography>
                <Box>
                    <Typography variant="caption">Receive</Typography>
                    <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                        <Typography>{index?.symbol}</Typography>
                        <TextField
                            type="number"
                            placeholder="0.0"
                            inputProps={{
                                sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                            }}
                            onChange={handleChangeAmountIndexBuy}
                        />
                    </Box>
                </Box>
                <Box>
                    <Box sx={{display:"flex", justifyContent:"space-between" }}>
                        <Typography variant="caption">Pay</Typography>
                        <Typography variant="caption">Balance: {usdcBalance} USDC</Typography>
                    </Box>
                    <Box sx={{display:"flex" ,justifyContent:"space-between"}}>
                        <Typography>USDC</Typography>
                        <TextField
                            type="number"
                            placeholder="0.0"
                            inputProps={{
                                sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                            }}
                            value={
                                !amountUSDCBuy
                                ? ""
                                : amountUSDCBuy
                            }
                            disabled={true}
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
                            sx={periodDCA === 'Day'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                            onClick={() => handleChoosePeriod('Day')}
                        >
                            Day
                        </Button>
                        <Button 
                            variant="text" 
                            sx={periodDCA === 'Weekly'?{background:theme.palette.gradient.primary, color:"white"}:{}}
                            onClick={() => handleChoosePeriod('Weekly')}
                        >                            
                            Weekly
                        </Button>
                        <Button 
                            variant="text" 
                            sx={periodDCA === 'Monthly'?{background:theme.palette.gradient.primary, color:"white"}:{}}
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
                </Box>
                }
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    {checkApprove ? (
                        <LoadingButton 
                            loading={waitingBuyIndex.isLoading}
                            onClick={handleBuyIndex} 
                            variant="contained" 
                            sx={{width:"320px"}}
                        >
                            <Typography sx={{fontWeight:"bold"}}>BUY {index?.symbol}</Typography>
                        </LoadingButton>
                    ) : (
                        <LoadingButton 
                            loading={waitingApproveUsdc.isLoading}
                            onClick={handleApproveUsdc} 
                            variant="contained" 
                            sx={{width:"320px"}}
                        >
                            <Typography sx={{fontWeight:"bold"}}>APPROVE YOUR USDC FOR TRADING</Typography>
                        </LoadingButton>
                    )}
                </Box>
            </Card>
        </Modal>
    )
}

export default BuyModal