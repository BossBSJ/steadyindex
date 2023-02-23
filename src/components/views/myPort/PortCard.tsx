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

    const [accountAddress, setAccountAddress] = useState<Address>()
    const [allIndexTokenAddress, setAllIndexTokenAddress] = useState<readonly Address[]>()
    const [indexHoldAddress, setIndexHoldAddress] = useState<Address[]>()
    const [amountIndexes, setAmountIndexes] = useState<number[]>()
    const [netWorth, setNetWorth] = useState<number>()
    const [indexAllocation, setIndexAllocation] = useState<indexAllocate[]>()
    const [tokenAllocation, setTokenAllocation] = useState<any>()

    const getAddress = useAccount()
    useEffect(() => {
        if(!getAddress) return
        setAccountAddress(getAddress.address)
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
        if(!accountAddress || !allIndexTokenAddress) return
        const getIndexHold = async () => {
            let indexHoldAddress:Address[] = []
            let amountIndexes = []

            for(let i = 0; i < allIndexTokenAddress.length; i++){
                const indexTokenAddress = allIndexTokenAddress[i]
                const indexBalance = await fetchBalance({
                    address: accountAddress,
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
    }, [accountAddress, allIndexTokenAddress])

    const { index } = useIndexTokenFactory(indexHoldAddress)

    useEffect(() => {
        if(!amountIndexes || !index) return

        let sumValue = 0
        for(let i = 0; i < amountIndexes.length;i++){
            sumValue = sumValue + (amountIndexes[i] * index[i].price)
        }

        let indexAllocation:indexAllocate[] = []
        let netWorth = 0
        let tokenAllocation:any = {}
        for(let i = 0; i < amountIndexes?.length; i++){
            indexAllocation.push({
                name: index[i].name,
                symbol: index[i].symbol,
                balance: amountIndexes[i],
                value: amountIndexes[i] * index[i].price,
                ratio: (amountIndexes[i] * index[i].price) / sumValue * 100
            })
            netWorth = netWorth + (amountIndexes[i] * index[i].price)

            const components = index[i].components
            for(let j = 0; j < components.length; j++){
                if(!tokenAllocation[components[j].symbol]){
                    tokenAllocation[components[j].symbol] = amountIndexes[i] * components[j].pricePerSet
                }
                else{
                    tokenAllocation[components[j].symbol] = tokenAllocation[components[j].symbol] + (amountIndexes[i] * components[j].pricePerSet)
                }
            }
        }
        const sortIndexAllocaion = indexAllocation.sort((i1,i2) => i2.ratio - i1.ratio)
        setIndexAllocation(sortIndexAllocaion)
        setTokenAllocation(tokenAllocation)
        setNetWorth(netWorth)
    },[amountIndexes, index])

    // console.log(tokenAllocation)
    //price per set * amountIndexes
    

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
                    <Typography variant="h4" sx={{fontWeight:"bold"}}>${numberWithCommas(netWorth)}</Typography>
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
                                <Box key={idx} sx={{display:"flex", justifyContent:"space-between"}}>
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
                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>{token.symbol}</Typography>
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