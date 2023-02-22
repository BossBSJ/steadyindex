import { Card, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { numberWithCommas } from "../../../utils/numberWithCommas"
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS, paletteColorCode } from "../../../constants/constants";
import { useEffect, useState } from "react";
import { Address, useAccount, useContractRead } from "wagmi";
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { fetchBalance } from "@wagmi/core";
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory";
import { indexAllocate } from "../../../interfaces/indexAllocate.interface";
import MyPieChart from "./MyPieChart";


const PortCard = () => {

    const [address, setAddress] = useState<Address>()
    const [allIndexTokenAddress, setAllIndexTokenAddress] = useState<readonly Address[]>()
    const [indexHoldAddress, setIndexHoldAddress] = useState<Address[]>()
    const [amountIndexes, setAmountIndexes] = useState<number[]>()
    const [indexAllocation, setIndexAllocation] = useState<indexAllocate[]>()

    const getAddress = useAccount()
    useEffect(() => {
        if(!getAddress) return
        setAddress(getAddress.address)
    }, [getAddress])

    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexs",
    })
    useEffect(() => {
        if(!getIndexTokensRead) return
        setAllIndexTokenAddress(getIndexTokensRead.data)

    }, [getIndexTokensRead])


    useEffect(() => {
        if(!address || !allIndexTokenAddress) return
        const getIndexHold = async () => {
            const indexHoldAddress:Address[] = []
            const amountIndexes = []

            for(let i = 0; i < allIndexTokenAddress.length; i++){
                const indexTokenAddress = allIndexTokenAddress[i]
                const indexBalance = await fetchBalance({
                    address: address,
                    token: indexTokenAddress
                })
                if(Number(indexBalance.formatted) > 0){
                    amountIndexes.push(Number(indexBalance.formatted))
                    indexHoldAddress.push(indexTokenAddress)
                }
            }
            setIndexHoldAddress(indexHoldAddress)
            setAmountIndexes(amountIndexes)
        }
        getIndexHold()
    }, [address, allIndexTokenAddress])

    const { index } = useIndexTokenFactory(indexHoldAddress)

    useEffect(() => {
        if(!amountIndexes || !index) return

        let sumValue = 0
        for(let i = 0; i < amountIndexes.length;i++){
            sumValue = sumValue + (amountIndexes[i] * index[i].price)
        }

        let indexAllocation:indexAllocate[] = []
        for(let i = 0; i < amountIndexes?.length; i++){
            indexAllocation.push({
                name: index[i].name,
                symbol: index[i].symbol,
                balance: amountIndexes[i],
                value: amountIndexes[i] * index[i].price,
                ratio: (amountIndexes[i] * index[i].price) / sumValue * 100
            })
        }
        const sortIndexAllocaion = indexAllocation.sort((i1,i2) => i2.ratio - i1.ratio)
        setIndexAllocation(sortIndexAllocaion)
    },[amountIndexes, index])

    console.log(amountIndexes)
    

    return(
        <Card sx={{marginTop: "20px", padding:"15px",  borderRadius:"16px"}}>
            <Box>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="h6" sx={{textDecoration:"underline #005FFF 2px"}}>Net worth</Typography>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #4A47FA 2px"}}>Indexes</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #07A6FF 2px"}}>DCA / Month</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{textDecoration:"underline #3CDCFF 2px"}}>NPL</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography variant="h4" sx={{fontWeight:"bold"}}>${numberWithCommas(11208.80)}</Typography>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>{index?.length}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>${numberWithCommas(208)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>+ 16.2%</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{marginTop:"20px", display:"flex", justifyContent:"space-around"}}>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Indexs Allocation</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between",}}>
                        <MyPieChart indexAllocation={indexAllocation}/>
                        <Box sx={{width:"230px"}}>
                            {indexAllocation?.map((token, idx:number) => (
                                <Box key={idx} sx={{display:"flex", justifyContent:"space-around"}}>
                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>{token.symbol}</Typography>
                                    <Typography>{token.ratio.toFixed(2)}%</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Tokens Allocation</Typography>
                    <Box sx={{display:"flex"}}>
                        <MyPieChart indexAllocation={indexAllocation}/>
                        <Box sx={{width:"230px"}}>
                            {indexAllocation?.map((token, idx:number) => (
                                <Box key={idx} sx={{display:"flex", justifyContent:"space-between"}}>
                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>{token.name}</Typography>
                                    <Typography>{token.ratio.toFixed(2)}%</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default PortCard