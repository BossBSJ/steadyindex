import { Autocomplete, Box, Button, Card, Chip, Grid, Input, List, Slider, TextField, Typography } from "@mui/material"
import { useState, useCallback, Dispatch, SetStateAction, useEffect } from "react"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Token } from "../../../../interfaces/token.interface";
import axios from "axios";
import { Asset } from "../../../../interfaces/asset.interface";


const mockToken:string[] = [
    "A", "B", "C", "D", "E", "F"
]

const lockedStyle = {
    cursor: "pointer"
}
const unLockedStyle = {
    cursor: "pointer",
    color:"#666666"
}

type IProps = {
    tokenList : Token[]
    setTokenList:  Dispatch<SetStateAction<Token[]>>
}

const ChooseTokenCard = (props:IProps) => {

    const { tokenList, setTokenList } = props

    // const [tokenList, setTokenList] = useState<Token[]>([])
    const [assets, setAssets] = useState<Asset[]>([])

    useEffect(() => {
        async function getTokenList() {
            const URL = "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/mc.tokenlist.json"
            await axios.get(URL)
                .then(function(response){
                    const tmp:Asset[] = response.data.tokens
                    const asset = tmp.filter(function(elem){
                        return elem.chainId == 43114 //Avalanche's chainId (mainnet)
                    })
                    setAssets(asset)
                })
                .catch(function(error){
                    return error
                })
        }
        getTokenList()
    }, [])


    const handleAddToken = (event: React.SyntheticEvent, newValue:Asset[], reason:string) => {
        // console.log(reason)
        if(reason == 'removeOption'){
            const length = newValue.length
            const newAllocation:number = 100 / (length)
            let newTokenList:Token[] = []
            for(let i = 0; i < length ; i++){
                newTokenList.push({
                    asset: newValue[i],
                    allocation: newAllocation,
                    locked: false
                })
            }
            setTokenList(newTokenList)
        }
        else if(reason == 'selectOption') {
            const newToken = newValue[newValue.length - 1]
            let newTokenList = [...tokenList]
            
            newTokenList.push({
                    asset: newToken,
                    allocation: 0,
                    locked: false
            })

            //change allocation in every token
            const length = newTokenList.length
            const newAllocation:number = 100 / (length)

            setTokenList( newTokenList.map((elem) => ({
                ...elem,
                allocation : newAllocation,
                locked: false
            })))
        }
        else if(reason == 'clear') {
            setTokenList([])
        }
    }


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
        setTokenList( newTokenList.map((elem) => ({
            ...elem,
            allocation : newAllocation,
            locked: false
        })))
    }

    return(
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Choose Token List</Typography>
            <Autocomplete
                limitTags={3}
                onChange={handleAddToken}
                multiple
                options={assets}
                getOptionLabel={(option:Asset) => (option.name)} 
                renderInput={(props) => (
                    <TextField
                        {...props}
                        placeholder="Search for token"
                    />
                    )}
                renderOption={(props, option) => (
                    <li 
                        key={option.address}
                        {...props}
                    >
                        <Box sx={{display:"flex", justifyContent:"space-between", width:"530px"}}>
                            <Box sx={{display:"flex"}}>
                                {/* <img 
                                    src={option.logoURI}
                                    style={{width:"24px", height:"24px", borderRadius:"50%"}}
                                /> */}
                                <Typography sx={{fontWeight:"bold"}}>
                                    {option.name}
                                </Typography>
                            </Box>
                            <Typography>
                                {option.symbol}
                            </Typography>
                        </Box>
                    </li>
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

            <Box sx={{padding:"20px", overflow:"auto", maxHeight:"500px"}}>
                {tokenList.length > 0 && <Grid container sx={{padding:"10px"}}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5} sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography variant="caption" sx={{fontWeight:"bold", color:"gray"}}>Allocation</Typography>
                        <Typography variant="caption" sx={{fontWeight:"bold", color:"gray"}}>Lock/Remove</Typography>
                    </Grid>
                </Grid>}
                {tokenList.map((token:Token, idx:number) => (
                    <Card key={idx} sx={{padding:"10px", backgroundColor:"rgba(255,255,255,0.75)"}}>
                        <Grid container>
                            <Grid item xs={7} sx={{display:"flex", justifyContent:""}}>
                                <img 
                                    src={token.asset?.logoURI}
                                    style={{width:"45px", height:"45px", borderRadius:"50%"}}
                                />
                                <Box sx={{marginLeft:"10px"}}>
                                    <Typography sx={{fontWeight:"bold"}}>
                                        {token.asset?.name}
                                    </Typography>
                                    <Typography>
                                        {token.asset?.symbol}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={5} sx={{display:"flex", justifyContent:"space-between"}}>
                                <Card sx={{padding:"10px", borderRadius:"8px"}}>
                                    <Input
                                        sx={{width:"50px"}}
                                        onChange={(e) => handleOnAllocation(idx, e.target.value)}
                                        disableUnderline={true}
                                        type="number"
                                        value={token.allocation}
                                        disabled={token.locked || !canSlide()}
                                    />
                                    <Typography component="span">%</Typography>
                                </Card>
                                <Box sx={{display:"flex"}}>
                                    <LockOutlinedIcon 
                                        onClick={() => {toggleLock(idx)}}
                                        sx={token.locked? lockedStyle: unLockedStyle}
                                    />
                                    <DeleteOutlineIcon 
                                        onClick={() => {toggleRemove(idx)}}
                                        sx={{cursor:"pointer", color:"gray"}}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Slider
                            min={1}
                            disabled={token.locked || !canSlide()}
                            value={token.allocation}
                            onChange={(e, value) => handleOnAllocation(idx, value.toString())}
                        />
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default ChooseTokenCard