import styled from "@emotion/styled";
import { Button, Card, InputBase, MenuItem, Modal, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IndexOnTable } from "../../interfaces/indexOnTable.interface";
import { Address, useAccount, useBalance, useWaitForTransaction } from "wagmi";
import { CONTROLLER_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "../../constants/constants";
import { readContract, prepareWriteContract, writeContract, fetchBalance } from "@wagmi/core";
import { CONTROLLER_CONTRACT_ABI, INDEX_TOKEN_CONTRACT_ABI } from "../../constants/abi";
import { ethers } from "ethers";
import { LoadingButton } from "@mui/lab";


type IProps = {
    open: boolean
    onClose: () => void
    index?: IndexOnTable
}


const SellModal = (props: IProps) => {

    const { open, onClose, index } = props

    const [amountIndexSell, setAmountIndexSell] = useState<string>("0")
    const [amountUSDCSell, setAmountUSDCSell] = useState<number>(0)

    const [address, setAddress] = useState<Address>()
    const [indexBalance, setIndexBalance] = useState<string>()
    const [checkApprove, setCheckApprove] = useState<boolean>(false)

    const [hashApprove, setHashApprove] = useState<Address>()
    const [hashSell, setHashSell] = useState<Address>()

    const handleChangeAmountIndexSell = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmountIndexSell(event.target.value)
    }

    useEffect(() => {
        if(!index) return
        setAmountUSDCSell(index.price * (+amountIndexSell))
    }, [amountIndexSell])

    //approve index for sell
    const handleApproveIndex = async () => {
        const maxInt = ethers.BigNumber.from(2).pow(256).sub(1)

        if(!index) return
        const config = await prepareWriteContract({
            address: index?.address,
            abi: INDEX_TOKEN_CONTRACT_ABI,
            functionName: "approve",
            args: [CONTROLLER_CONTRACT_ADDRESS, maxInt],
        })

        const data = await writeContract(config)

        setHashApprove(data.hash)
    }

    const waitingApproveIndex = useWaitForTransaction({
        hash: hashApprove,
        onSuccess(){
            setCheckApprove(true)
        },
        enabled: hashApprove !== undefined
    })

    // sell index
    const handleSellIndex = async () => {
        const _amountIndexSell = ethers.utils.parseUnits(String(amountIndexSell), 18)
        const _minAmountOut = ethers.utils.parseUnits("0")

        if(!index?.address || !address) return
        const config = await prepareWriteContract({
            address: CONTROLLER_CONTRACT_ADDRESS,
            abi: CONTROLLER_CONTRACT_ABI,
            functionName:"redeemIndexToken",
            args: [index?.address, _amountIndexSell, USDC_CONTRACT_ADDRESS, _minAmountOut, address]
        })

        const data = await writeContract(config)
        setHashSell(data.hash)
    }

    const waitingSellIndex = useWaitForTransaction({
        hash: hashSell,
        onSuccess(data){
            console.log(data)
            getIndexBalance()
        },
        enabled: hashSell !== undefined
    })

    //get balance Index
    const getAddress = useAccount()
    useEffect(() => {
        if(!getAddress) return
        setAddress(getAddress.address)
    }, [getAddress])

    const getIndexBalance = async () => {
        if(!address || !index) return
        const indexBalance = await fetchBalance({
            address: address,
            token: index?.address
        })
        setIndexBalance(indexBalance.formatted)
    }
    useEffect(() => {
        getIndexBalance()
    },[address, hashSell, index, open]) 

    //check allowance
    useEffect(() => {
        if(!address || !index) return
        const checkAllowance = async () => {
            const allowance = await readContract({
                address: index?.address,
                abi: INDEX_TOKEN_CONTRACT_ABI,
                functionName: "allowance",
                args: [address, CONTROLLER_CONTRACT_ADDRESS]
            })
            if(Number(allowance._hex) > 0)
                setCheckApprove(true)
            else
                setCheckApprove(false)
        }
        checkAllowance()
    }, [address, index])

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{backgroundColor:"#F3F3FF", padding: "20px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", minHeight: "40vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>Sell</Typography>
                <Box>
                    <Box sx={{display:"flex", justifyContent:"space-between" }}>
                        <Typography variant="caption">Sell</Typography>
                        <Typography variant="caption">Balance: {indexBalance} {index?.symbol}</Typography>
                    </Box>
                    <Box sx={{display:"flex" ,justifyContent:"space-between", alignItems:"center"}}>
                        <Typography>{index?.symbol}</Typography>
                        <TextField
                            type="number"
                            placeholder="0.0"
                            inputProps={{
                                sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                            }}
                            onChange={handleChangeAmountIndexSell}

                        />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="caption">Recieve</Typography>
                    <Box sx={{display:"flex" ,justifyContent:"space-between", marginBottom:"20px", alignItems:"center"}}>
                        <Typography>USDC</Typography>
                        <TextField
                            type="number"
                            placeholder="0.0"
                            inputProps={{
                                sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                            }}
                            value={
                                !amountUSDCSell
                                ? ""
                                : amountUSDCSell
                            }
                            disabled={true}
                        />
                    </Box>
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    {checkApprove? (
                        <LoadingButton
                            loading={waitingSellIndex.isLoading}
                            onClick={handleSellIndex} 
                            variant="contained" 
                            sx={{width:"320px"}}
                            disabled={!amountIndexSell}
                        >
                            <Typography sx={{fontWeight:"bold"}}>SELL {index?.symbol}</Typography>
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            loading={waitingApproveIndex.isLoading}
                            onClick={handleApproveIndex} 
                            variant="contained" 
                            sx={{width:"320px"}}
                        >
                            <Typography sx={{fontWeight:"bold"}}>APPROVE YOUR INDEX FOR TRADING</Typography>
                        </LoadingButton>
                    )}
                </Box>
            </Card>
        </Modal>
    )
}

export default SellModal
