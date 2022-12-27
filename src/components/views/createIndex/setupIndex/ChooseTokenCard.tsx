import { Autocomplete, Box, Button, Card, Input, List, Slider, TextField, Typography } from "@mui/material"
import { useState } from "react"

const mockToken:string[] = [
    "A", "B", "C", "D", "E", "F"
]

const ChooseTokenCard = () => {

    interface Token {
        name: string | undefined
        allocation: number
        disabledSlide: boolean
    }

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
        newTokenList[idx].allocation = newValue
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
        //give allocation to other token
        if(idx == 0){
            newTokenList[idx + 1].allocation += newTokenList[idx].allocation
        } else {
            newTokenList[idx - 1].allocation += newTokenList[idx].allocation
        }
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

            {/* <Button 
                onClick={()=> {
                    console.log(tokenList)
                }}
            >
                Test Button
            </Button> */}
            {tokenList.map((token:Token, idx:number) => (
                <Card key={idx} sx={{marginTop:"20px" ,padding:"10px", backgroundColor:"rgba(255,255,255,0.75)"}}>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Box>{token.name}</Box>
                        <Card sx={{padding:"10px", borderRadius:"8px"}}>
                            <Input
                                sx={{width:"50px"}}
                                onChange={handleInputAllocationChange(idx)}
                                disableUnderline={true}
                                type="number"
                                value={token.allocation}
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
                        min={1}
                        disabled={token.disabledSlide}
                        value={token.allocation}
                        onChange={handleSlideAllocationChange(idx)}
                    />
                </Card>
            ))}
        </Box>
    )
}

export default ChooseTokenCard