import { LoadingButton } from "@mui/lab"
import { Box, Button, ButtonGroup, Card, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Address, useAccount, erc20ABI, useWaitForTransaction } from "wagmi"
import { readContract, prepareWriteContract, writeContract, fetchBalance } from '@wagmi/core'
import { IndexOnTable } from "../../interfaces/indexOnTable.interface"
import theme from "../../theme"
import { DCA_MANAGER_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "../../constants/constants"
import { ethers } from "ethers"
import { DCA_MANAGER_CONTRACT_ABI, INDEX_TOKEN_CONTRACT_ABI } from "../../constants/abi"

type IProps = {
    open: boolean
    onClose: () => void
    // dcaModal: boolean
    index?: IndexOnTable
}

const DCAModal = (props: IProps) => {
    const { open, onClose, index } = props

    const [amountIndex, setAmountIndex] = useState<number>(0)
    const [amountUsdcPerPeriod, setAmountUsdcPerPeriod] = useState<number>(0)
    const [periodDCA, setPeriodDCA] = useState<string>('')

    const [address, setAddress] = useState<Address>()
    const [usdcBalance, setUsdcBalance] = useState<string>()
    const [checkApprove, setCheckApprove] = useState<boolean>(false)

    const [hashApprove, setHashApprove] = useState<Address>()
    const [hashSubcription, setHashSubsciption] = useState<Address>()

    const handleChoosePeriod = (plan:string) => {
        if(periodDCA === plan){
            setPeriodDCA('')
        } else {
            setPeriodDCA(plan)
        }
    }

    const handleChangeAmountIndex = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmountIndex(+event.target.value)
    }

    const handleChangeAmountUsdcPerPeriod = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmountUsdcPerPeriod(+event.target.value)
    }


    //approve usdc for DCAManager
    const handleApproveUsdc = async () => {
        const maxInt = ethers.BigNumber.from(2).pow(256).sub(1)

        const config = await prepareWriteContract({
            address: USDC_CONTRACT_ADDRESS,
            abi: erc20ABI,
            functionName: "approve",
            args: [DCA_MANAGER_CONTRACT_ADDRESS, maxInt],
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

    //subcription DCA investment
    const handleSubscription = async () => {
        if(!index) return
        const trustedAddress = await readContract({
            address: index?.address,
            abi: INDEX_TOKEN_CONTRACT_ABI,
            functionName: "manager"
        })

        const _amountIndex = ethers.utils.parseUnits(String(amountUsdcPerPeriod / index.price), 18) //change to getAmountInForIndexToken????

        let cycle = 0
        if(periodDCA === 'Day')
            cycle = 60 * 60 * 24
        else if(periodDCA === 'Weekly')
            cycle = 7 * 60 * 60 * 24
        else if(periodDCA === 'Monthly')
            cycle = 30 * 60 * 60 * 24

        const _cycle = ethers.BigNumber.from(cycle)

        const _amountUsdcPerPeriod = ethers.utils.parseUnits(String(amountUsdcPerPeriod), 6)

        const config = await prepareWriteContract({
            address: DCA_MANAGER_CONTRACT_ADDRESS,
            abi: DCA_MANAGER_CONTRACT_ABI,
            functionName: "subscription",
            args: [trustedAddress, index.address, _amountIndex, USDC_CONTRACT_ADDRESS, _amountUsdcPerPeriod, _cycle]
        })

        const data = await writeContract(config)
        setHashSubsciption(data.hash)
    }

    const waitingSubsciption = useWaitForTransaction({
        hash: hashSubcription,
        onSuccess(data) {
            console.log(data)
            getUsdcBalance()
        },
        enabled: hashSubcription !== undefined
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
    },[address, index])

    //check allowance
    useEffect(() => {
        if(!address) return
        const checkAllowance = async () => {
            const allowance = await readContract({
                address: USDC_CONTRACT_ADDRESS,
                abi: erc20ABI,
                functionName: "allowance",
                args: [address , DCA_MANAGER_CONTRACT_ADDRESS]
            })
            if(Number(allowance._hex) > 0)
                setCheckApprove(true)
            else
                setCheckApprove(false)
        }
        checkAllowance()
    },[address])

    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card sx={{backgroundColor:"#F3F3FF", padding: "20px", position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", minHeight:"40vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}}>DCA</Typography>
                <Box>
                    <Box sx={{display:"flex", justifyContent:"space-between" }}>
                        <Typography variant="caption">Invest per period</Typography>
                        <Typography variant="caption">Balance: {usdcBalance} USDC</Typography>
                    </Box>
                    <Box sx={{display:"flex" ,justifyContent:"space-between", alignItems:"center"}}>
                        <Typography>USDC</Typography>
                        <TextField
                            type="number"
                            placeholder="0.0"
                            inputProps={{
                                sx: {textAlign: "right","&::placeholder": {textAlign: "right",}},
                            }}
                            onChange={handleChangeAmountUsdcPerPeriod}
                        />
                    </Box>
                </Box>
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
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                {checkApprove ? (
                        <LoadingButton 
                            loading={waitingSubsciption.isLoading}
                            onClick={handleSubscription} 
                            variant="contained" 
                            sx={{width:"320px"}}
                            disabled={!periodDCA || !amountUsdcPerPeriod}
                        >
                            <Typography sx={{fontWeight:"bold"}}>Create Investment {index?.symbol}</Typography>
                        </LoadingButton>
                    ) : (
                        <LoadingButton 
                            loading={waitingApproveUsdc.isLoading}
                            onClick={handleApproveUsdc} 
                            variant="contained" 
                            sx={{width:"320px"}}
                        >
                            <Typography sx={{fontWeight:"bold"}}>APPROVE YOUR USDC FOR DCA</Typography>
                        </LoadingButton>
                    )}
                </Box>
            </Card>
        </Modal>
    )
}

export default DCAModal