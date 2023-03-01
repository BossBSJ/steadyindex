
import { Button, ButtonGroup, Card, CardHeader, InputBase, MenuItem, Modal, Paper, Select, SelectChangeEvent, Switch, TextField, Tooltip, Typography } from "@mui/material"
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


type IProps = {
    open: boolean
    onClose: () => void
    index?: IndexOnTable
}

const BuyModal = (props: IProps) => {
    const { open, onClose, index } = props

    const [amountIndexBuy, setAmountIndexBuy] = useState<string>()
    const [amountUSDCBuy, setAmountUSDCBuy] = useState<number>()

    const [address, setAddress] = useState<Address>()
    const [usdcBalance, setUsdcBalance] = useState<string>()
    const [checkApprove, setCheckApprove] = useState<boolean>(false)

    const [hashApprove, setHashApprove] = useState<Address>()
    const [hashBuy, setHashBuy] = useState<Address>()

    const handleChangeAmountIndexBuy = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmountIndexBuy(event.target.value)
    }

    useEffect(() => {
        if(!index) return
        const getAmountInForIndexToken = async () => {
            if(amountIndexBuy && amountIndexBuy !== '0'){
                const _amountIndexBuy = ethers.utils.parseUnits(amountIndexBuy)
                const amountUsdcIn = await readContract({
                    address: CONTROLLER_CONTRACT_ADDRESS,
                    abi: CONTROLLER_CONTRACT_ABI,
                    functionName: "getAmountInForIndexToken",
                    args: [index.address, _amountIndexBuy, USDC_CONTRACT_ADDRESS]
                })
                // console.log(Number(amountUsdcIn.tokenInAmount._hex))
                setAmountUSDCBuy(Number(amountUsdcIn.tokenInAmount._hex) / 10**6)
            } else {
                setAmountUSDCBuy(0)
            }
        }
        getAmountInForIndexToken()

    }, [amountIndexBuy])

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
        setUsdcBalance(indexBalance.formatted)
    }
    useEffect(() => {
        getUsdcBalance()
    },[address, hashBuy, index, open])

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
                    <Box sx={{display:"flex" ,justifyContent:"space-between", alignItems:"center"}}>
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
                        <Box sx={{display:"flex",justifyContent:"space-between", width:"50px", alignItems:"center"}}>
                            <Typography variant="caption">Pay</Typography>
                            <Tooltip title="Fee 0.25%" sx={{marginLeft:"5px"}}>
                                <InfoOutlinedIcon sx={{fontSize:"medium", color:"gray"}}/>
                            </Tooltip>
                        </Box>
                        <Typography variant="caption">Balance: {usdcBalance} USDC</Typography>
                    </Box>
                    <Box sx={{display:"flex" ,justifyContent:"space-between", marginBottom:"20px",alignItems:"center"}}>
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
                
                <Box sx={{display:"flex", justifyContent:"space-around", flexDirection:"column"}}>
                    {checkApprove ? (
                        <LoadingButton 
                            loading={waitingBuyIndex.isLoading}
                            onClick={handleBuyIndex} 
                            variant="contained" 
                            sx={{width:"320px"}}
                            disabled={!amountIndexBuy || amountIndexBuy === '0'}
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