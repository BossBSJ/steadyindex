import { Autocomplete, Button, Card, Grid, Input, LinearProgress, Select, Slider, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"


const mockToken:string[] = [
    "A", "B", "C", "D", "E", "F"
]

const SetupIndex = () => {
    

    interface Token {
        name: string | undefined
        allocation: number
        disabledSlide: boolean
    }

    const ChooseTokenPage = () => {

        const [tokenList, setTokenList] = useState<Token[]>([])

        const handleAddToken = (event: React.SyntheticEvent, newValue: string[]) => {
            const newToken = newValue.pop()
            let newTokenList = [...tokenList]

            const length:number = newTokenList.length
            let newAllocation:number = 0
            if (length == 0) {
                newAllocation = 100
            } else {
                newAllocation = newTokenList[length - 1].allocation / 2
                newTokenList[length - 1].allocation = newAllocation
            }

            newTokenList.push({
                name: newToken,
                allocation: newAllocation,
                disabledSlide: false
            })
            setTokenList(newTokenList)
        }

        const handleSlideAllocationChange = (idx:number) => (event: Event, newValue: any) => {
            let newTokenList = [...tokenList]

            const length:number = newTokenList.length
            if (idx == 0) {
                if(length > 1) {
                    newTokenList[idx].allocation = newValue
                    // let allAllocation:number = 0
                    // for (let i = 0; i < length; i++){
                    //     allAllocation += newTokenList[i].allocation
                    //     console.log(newTokenList[i], allAllocation)
                    // }
                    // console.log(allAllocation)
                    newTokenList[idx + 1].allocation = 100 - newValue
                }
            } else {
                newTokenList[idx].allocation = newValue
                newTokenList[idx - 1].allocation = 100 - newValue
            }
            setTokenList(newTokenList)
        }

        const handleInputAllocationChange = (idx:number) => (event: any) => {
            let newTokenList = [...tokenList]
            newTokenList[idx].allocation = +event.target.value
            setTokenList(newTokenList)
        }

        const toggleLock = (idx:number) => {
            let newTokenList = [...tokenList]
            newTokenList[idx].disabledSlide = !newTokenList[idx].disabledSlide
            setTokenList(newTokenList)
        }

        const toggleRemove = (idx:number) => {
            let newTokenList = [...tokenList]
            newTokenList.splice(idx,1)
            setTokenList(newTokenList)
        }

        return(
            <Box sx={{padding: "20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Choose Token List</Typography>
                <Autocomplete
                    onChange={handleAddToken}
                    multiple
                    options={mockToken}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for token"
                        />
                        )}
                />

                <Button 
                    onClick={()=> {
                        console.log(tokenList)
                    }}
                >
                    Test Button
                </Button>

                {tokenList.map((token:Token, idx:number) => (
                    <Card key={idx} sx={{margin:"10px" ,padding:"10px", backgroundColor:"rgba(255,255,255,0.75)"}}>
                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                            <Box>{token.name}</Box>
                            <Card sx={{padding:"10px", borderRadius:"8px"}}>
                                <Input
                                    sx={{width:"50px"}}
                                    onChange={handleInputAllocationChange(idx)}
                                    disableUnderline={true}
                                    type="number"
                                    value={token.allocation}
                                    // inputProps={{min:0, max:100}}
                                />
                                <span>%</span>
                            </Card>
                            <Box>
                                <Typography 
                                    onClick={() => {toggleLock(idx)}}
                                    sx={{cursor:"pointer"}}
                                >
                                    Lock
                                </Typography>
                                <Typography 
                                    onClick={() => {toggleRemove(idx)}}
                                    sx={{cursor:"pointer"}}
                                >
                                    Remove
                                </Typography>
                            </Box>
                        </Box>
                        <Slider
                            disabled={token.disabledSlide}
                            value={token.allocation}
                            onChange={handleSlideAllocationChange(idx)}
                        />
                    </Card>
                ))}
            </Box>
        )
    }

    const SetupIndexPage = () => {
        return(
            <Box sx={{padding:"20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Setup Your Index</Typography>
                <Box>
                    <Typography>Index Name</Typography>
                    <TextField placeholder="e.g. Steady whale index"/>
                </Box>
                <Box>
                    <Typography>Index Symbol</Typography>
                    <TextField placeholder="e.g. SWI"/>
                </Box>
                <Box>
                    <Typography>Straing Price (USD)</Typography>
                    <TextField placeholder="100.00"/>
                </Box>
                <Box>
                    <Typography sx={{fontWeight:"bold"}}>Set Fees</Typography>
                    <Box sx={{display:"flex"}}>
                        <Box>
                            <Typography variant="body2">Streaming Fee</Typography>
                            <TextField placeholder="100.00"/>
                        </Box>
                        <Box>
                            <Typography variant="body2">Insurance Fee</Typography>
                            <TextField placeholder="100.00"/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    
    const DeployPage = () => {

        const mockTokenAllocation = [
            {name: "BTC", allocation: 30},
            {name: "BTC", allocation: 30},
            {name: "BTC", allocation: 30},
            {name: "BTC", allocation: 10}
        ]
    
        return (
            <Box sx={{padding: "20px"}}>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Deploy smart contract</Typography>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Box>
                        <Card sx={{padding:"16px", borderRadius:"16px"}}>
                            <Typography sx={{fontWeight:"bold"}}>Steadty whale index</Typography>
                            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                <Typography>SWI</Typography>
                                <Typography sx={{fontWeight:"bold"}}>$100</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column"}}>
                                <Typography variant="caption" sx={{fontWeight:"bold"}}>Owner Address</Typography>
                                <Typography variant="caption" sx={{color:"gray"}}>0x75Aa63D42AA56F08F42aa5deB8d5892358D942c1</Typography>
                            </Box>
                        </Card>

                        <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                            <Typography variant="caption">Streming Fee</Typography>
                            <Typography variant="caption">10%</Typography>
                        </Box>
                        <Box sx={{display:"flex", justifyContent:"space-between", padding:"0 15px 0 15px"}}>
                            <Typography variant="caption">Insurance Fee</Typography>
                            <Typography variant="caption">10%</Typography>
                        </Box>
                    </Box>
                    
                    <Card sx={{padding:"16px", borderRadius:"16px"}}>
                        index cover photo
                    </Card>
                </Box>
                <Box>
                    {mockTokenAllocation.map((token:any, idx:number) => (
                        <Box key={idx}>
                            <Typography>{token.name}</Typography>
                            <Typography>{token.allocation} %</Typography>
                            <LinearProgress variant="determinate" value={token.allocation}/>
                        </Box>
                    ))}
                </Box>
            </Box>
        )
    }
    
    const [page, setPage] = useState<number>(1)
    const handleOnNext = () => {
        if(page == 3) 
            return
        setPage(page + 1)
    }

    const handleOnBack = () => {
        if(page == 1) 
            return
        setPage(page - 1)
    }

    return (
        <Card sx={{backgroundColor:"rgba(255,253,251,0.48)", width:"600px", height:"700px"}}>
            {page==1?<ChooseTokenPage/>:''}
            {page==2?<SetupIndexPage/>:''}
            {page==3?<DeployPage/>:''}
            <Box>
                <Button onClick={handleOnBack}>Back</Button>
                <Button onClick={handleOnNext}>{page==3? "Deploy Contract": "Next"}</Button>
            </Box>
        </Card>
    )
}

export default SetupIndex