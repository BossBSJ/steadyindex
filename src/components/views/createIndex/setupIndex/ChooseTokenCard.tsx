import { Autocomplete, Box, Button, Card, Input, List, Slider, TextField, Typography } from "@mui/material"
import { useState, useCallback } from "react"

const mockToken:string[] = [
    "A", "B", "C", "D", "E", "F"
]

const ChooseTokenCard = () => {

    interface Token {
        name: string | undefined // should be address in lowerCase
        allocation: number
        locked: boolean
    }

    const [tokenList, setTokenList] = useState<Token[]>([])

    const handleAddToken = (event: React.SyntheticEvent, newValue: string[]) => {
        const newToken = newValue.pop() //* newValue[0]
        let newTokenList = [...tokenList]
        
        newTokenList.push({
                name: newToken,
                allocation: 0,
                locked: false
        })

        //change allocation in every token
        const length = newTokenList.length
        const newAllocation:number = 100 / (length)
        // newTokenList.forEach((elem) => {
        //     elem.allocation = newAllocation
        // })
        setTokenList( newTokenList.map((elem) => ({
            ...elem,
            allocation : newAllocation,
            locked: false
        })))
        // console.log(newTokenList)
        // setTokenList(newTokenList)
    }

    // const handleSlideAllocationChange = (idx:number) => (event: Event, newValue: any) => {
    //     let newTokenList = [...tokenList]
    //     const length:number = newTokenList.length

    //     let effectIdx:number = (idx + 1) % length 

    //     //check minimum
    //     for(let i = 0; i < length; i++){
    //         effectIdx = (idx + 1 + i) % length
    //         if(newTokenList[effectIdx].allocation <= 1){
    //             continue
    //         } else {
    //             break
    //         }
    //     }

    //     newTokenList[effectIdx].allocation += newTokenList[idx].allocation - newValue
    //     newTokenList[idx].allocation = newValue

    //     // if(isAllocationOneHundred(tokenList)){
    //     //     setTokenList(newTokenList)
    //     // }
    //     // return
    //     setTokenList(newTokenList)
    // }
    // fx =  handleInputAllocationChange = (idx:number)
    // fx(event: any)
    // const handleInputAllocationChange = (idx:number) => (event: any) => {
    //     let newTokenList = [...tokenList]
    //     newTokenList[idx].allocation = +event.target.value
    //     setTokenList(newTokenList)
    // }

    const handleOnAllocation = (idx:number, value:string) => {
        let newTokenList = [...tokenList]
        let diff = +value - newTokenList[idx].allocation
        const length = newTokenList.length
        
        // newTokenList[idx].allocation = +value
        newTokenList[idx].allocation += diff
        // idx + length + 1 ->  +1 for popourse dicount current idx is case of cant dicount another token
        for(let _i = idx+1; _i < idx + length + 1; _i++){
            const i = _i%length
            if(newTokenList[i].locked) // skip if locked
                continue
            else {
                // if discuout allocation only next token (nextToken allocation > diff)
                if(newTokenList[i].allocation - diff >= 1){ 
                    newTokenList[i].allocation -= diff
                    diff -= diff
                } 
                // if need more than 1 token to discout allocation, so nexttoken allocation is will 1 for sure
                else {
                    let nextDiff = diff - (newTokenList[i].allocation - 1) // -1 is mean nextToken allocation will be eql 1
                    newTokenList[i].allocation -= (diff - nextDiff) // same meaning as above
                    diff = nextDiff // new diff for discout next of nextToken
                    continue
                }
            }
            if(diff == 0) break // if no need to dicount any allocation will break the loop
        }
        setTokenList(newTokenList)
    }

    function canSlide () {
        let countLocked:number = 0
        const length = tokenList.length
        for(let i = 0; i < length; i++){
            if(tokenList[i].locked)
                countLocked += 1
        }
        if(countLocked >= length - 1) 
            return false
        return true
    }

//     const canSlide = useCallback(() => {
//         let countLocked:number = 0
//         const length = tokenList.length
//         for(let i = 0; i < length; i++){
//             if(tokenList[i].locked)
//                 countLocked += 1
//         }
// console.log(countLocked >= length - 1)

//         if(countLocked >= length - 1) 
//             return false
//         return true
//     },[tokenList])

    const toggleLock = (idx:number) => {
        let newTokenList = [...tokenList]
        newTokenList[idx].locked = !newTokenList[idx].locked

        setTokenList(newTokenList)
    }

    const toggleRemove = (idx:number) => {
        let newTokenList = [...tokenList]
        //give allocation to other token

        newTokenList.splice(idx,1)

        const length = newTokenList.length
        const newAllocation:number = 100 / (length)
        // newTokenList.forEach((elem) => {
        //     elem.allocation = newAllocation
        //     elem.locked = false
        // })
        
        // setTokenList(newTokenList)
        setTokenList( newTokenList.map((elem) => ({
            ...elem,
            allocation : newAllocation,
            locked: false
        })))
    }

    return(
        <Box sx={{padding: "40px", }}>
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
                    let allAllocation:number = 0
                    tokenList.forEach((elem,i) => {
                        allAllocation += elem.allocation
                    })
                    console.log(tokenList, allAllocation)
                }}
            >
                Test Button
            </Button>

            <Box sx={{padding:"20px", overflow:"auto", maxHeight:"400px"}}>
                {tokenList.map((token:Token, idx:number) => (
                    <Card key={idx} sx={{padding:"10px", backgroundColor:"rgba(255,255,255,0.75)"}}>
                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold"}}>
                                {token.name}
                            </Typography>
                            <Card sx={{padding:"10px", borderRadius:"8px"}}>
                                <Input
                                    sx={{width:"50px"}}
                                    onChange={(e) => handleOnAllocation(idx, e.target.value)}
                                    // onChange={handleInputAllocationChange(idx)}
                                    disableUnderline={true}
                                    type="number"
                                    value={token.allocation}
                                    disabled={token.locked || !canSlide()}
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
                            disabled={token.locked || !canSlide()}
                            value={token.allocation}
                            // onChange={handleSlideAllocationChange(idx)}
                            onChange={(e, value) => handleOnAllocation(idx, value.toString())}
                        />
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default ChooseTokenCard