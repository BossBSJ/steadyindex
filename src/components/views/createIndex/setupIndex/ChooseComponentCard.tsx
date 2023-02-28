import { Autocomplete, Box, Button, Card, Chip, Grid, Input, List, ListItem, ListItemButton, Modal, Slider, TextField, Typography } from "@mui/material"
import React, { useState, useCallback, Dispatch, SetStateAction, useEffect } from "react"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ComponentList } from "../../../../interfaces/component.interface";
import axios from "axios";
import { Asset } from "../../../../interfaces/asset.interface";

const lockedStyle = {
    cursor: "pointer"
}
const unLockedStyle = {
    cursor: "pointer",
    color:"#666666"
}

type IProps = {
    componentList : ComponentList[]
    setComponentList:  Dispatch<SetStateAction<ComponentList[]>>
}

const ChooseComponentCard = (props:IProps) => {

    const { componentList, setComponentList } = props 

    const [assets, setAssets] = useState<Asset[]>([])
    const [showChooseComponentModal, setShowChooseComponentModal] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Asset[]>([]);
    const [filterAssets, setFilterAssets] = useState<Asset[]>([])

    const handelOpenChooseCompoentModal = () => {
        setSearchTerm('')
        setShowChooseComponentModal(true)
    }

    const handelCloseChooseCompoentModal = () => {
        setShowChooseComponentModal(false)
    }

    const CHAIN_FUJI = 43113
    const CHAIN_AVALANCE = 43114

    useEffect(() => {
        async function getTokenList() {
            const URL = "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/mc.tokenlist.json"
            await axios.get(URL)
                .then(function(response){
                    const tmp:Asset[] = response.data.tokens
                    const asset = tmp.filter(function(elem){
                        return elem.chainId === CHAIN_FUJI //43113 = Avalanche Fuji Testnet, 43114 = Avalanche mainet
                    })
                    setAssets(asset)
                })
                .catch(function(error){
                    return error
                })
        }
        getTokenList()
    }, [])

    useEffect(() => {
        function removeSmallArrayElements(big:Asset[], small:Asset[]) {
            return big.filter(function(bigElement) {
                return !small.some(function(smallElement) {
                    return bigElement.address === smallElement.address && bigElement.address === smallElement.address;
                });
            });
        }

        const componentAssets = componentList.map(item => item.asset)

        const filterAssets = removeSmallArrayElements(assets, componentAssets)

        setFilterAssets(filterAssets)
    },[componentList, assets,])

    useEffect(() => {
        const results = filterAssets.filter(asset =>
            asset.name.toLowerCase().includes(searchTerm)
        )
        setSearchResults(results)
    },[searchTerm, filterAssets])

    const handleChangeSearchAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleAddToken = (asset:Asset) => {
        let newComponentList = [...componentList]
        newComponentList.push({
            asset: asset,
            allocation: 0,
            locked: false
        })
        
        //change allocation in every token
        const length = newComponentList.length
        const newAllocation = 100 / (length)

        setComponentList( newComponentList.map((elem) => ({
            ...elem,
            allocation : newAllocation,
            locked: false
        })))
        setShowChooseComponentModal(false)
    }


    const handleOnAllocation = (idx:number, value:string) => {
        let newComponentList = [...componentList]
        let diff = +value - newComponentList[idx].allocation
        const length = newComponentList.length
        
        // newComponentList[idx].allocation = +value
        newComponentList[idx].allocation += diff
        // idx + length + 1 ->  +1 for popourse dicount current idx is case of cant dicount another token
        for(let _i = idx+1; _i < idx + length + 1; _i++){
            const i = _i%length
            if(newComponentList[i].locked) // skip if locked
                continue
            else {
                // if discuout allocation only next token (nextToken allocation > diff)
                if(newComponentList[i].allocation - diff >= 1){ 
                    newComponentList[i].allocation -= diff
                    diff -= diff
                } 
                // if need more than 1 token to discout allocation, so nexttoken allocation is will 1 for sure
                else {
                    let nextDiff = diff - (newComponentList[i].allocation - 1) // -1 is mean nextToken allocation will be eql 1
                    newComponentList[i].allocation -= (diff - nextDiff) // same meaning as above
                    diff = nextDiff // new diff for discout next of nextToken
                    continue
                }
            }
            if(diff === 0) break // if no need to dicount any allocation will break the loop
        }
        setComponentList(newComponentList)
    }

    function canSlide () {
        let countLocked:number = 0
        const length = componentList.length
        for(let i = 0; i < length; i++){
            if(componentList[i].locked)
                countLocked += 1
        }
        if(countLocked >= length - 1) 
            return false
        return true
    }

    const toggleLock = (idx:number) => {
        let newComponentList = [...componentList]
        newComponentList[idx].locked = !newComponentList[idx].locked

        setComponentList(newComponentList)
    }

    const toggleRemove = (idx:number) => {
        let newComponentList = [...componentList]
        //give allocation to other token

        newComponentList.splice(idx,1)

        const length = newComponentList.length
        const newAllocation:number = 100 / (length)
        setComponentList( newComponentList.map((elem) => ({
            ...elem,
            allocation : newAllocation,
            locked: false
        })))
    }


    return(
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Choose Token List</Typography>

            <Button sx={{width:"100%"}} onClick={handelOpenChooseCompoentModal}>Search for token</Button>
            <Modal 
                open={showChooseComponentModal} 
                onClose={handelCloseChooseCompoentModal}
            >   
                <Card sx={{position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", maxHeight:"60vh", minWidth:"40vh", overflow:"auto", padding:"20px"}}>
                    <Input
                        onChange={handleChangeSearchAsset}
                        placeholder="Search by name"
                        sx={{width: "100%"}}
                    />
                    <List>
                        {searchResults.map((asset, idx) => (
                            <ListItemButton 
                                key={idx} 
                                sx={{display:"flex", justifyContent:"space-between", padding:"10px"}}
                                onClick={() => handleAddToken(asset)}    
                            >
                                <Box sx={{display:"flex"}}>
                                    <img 
                                        // src={option.logoURI}
                                        src={`https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${asset.address}/logo.png`}
                                        style={{width:"24px", height:"24px", borderRadius:"50%"}}
                                    />
                                    <Typography sx={{fontWeight:"bold", paddingLeft: "15px"}}>
                                        {asset.name}
                                    </Typography>
                                </Box>
                                <Typography>
                                    {asset.symbol}
                                </Typography>
                            </ListItemButton>
                        ))}
                    </List>
                </Card>
            </Modal>

            {/* <Button 
                onClick={()=> {
                    let allAllocation:number = 0
                    componentList.forEach((elem,i) => {
                        allAllocation += elem.allocation
                    })
                    console.log(componentList, allAllocation)
                }}
            >
                Test Button
            </Button> */}

            <Box sx={{padding:"20px", overflow:"auto", maxHeight:"500px"}}>
                {componentList.length > 0 && 
                <Grid container sx={{padding:"10px"}}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5} sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography variant="caption" sx={{fontWeight:"bold", color:"gray"}}>Allocation</Typography>
                        <Typography variant="caption" sx={{fontWeight:"bold", color:"gray"}}>Lock/Remove</Typography>
                    </Grid>
                </Grid>}
                {componentList.map((token:ComponentList, idx:number) => (
                    <Card key={idx} sx={{padding:"10px", backgroundColor:"rgba(255,255,255,0.75)"}}>
                        <Grid container>
                            <Grid item xs={7} sx={{display:"flex"}}>
                                <img 
                                    src={token.asset?.logoURI}
                                    // src={`https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/${token.asset.address}/logo.png`}
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

export default ChooseComponentCard