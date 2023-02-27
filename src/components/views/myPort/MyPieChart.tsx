import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";
import { Address, useAccount, useBalance, useContractRead } from "wagmi";
import { fetchBalance } from '@wagmi/core'
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS, paletteColorCode } from "../../../constants/constants";
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { allocation } from "../../../interfaces/allocation.interface";


type IProps = {
    indexAllocation? : allocation[]
}

const MyPieChart = (props: IProps) => {

    const { indexAllocation } = props

    
    const CustomToolTip = ({ active, payload, label }: any) => {
        if(active && payload && payload.length){
            const data = payload[0].payload.payload
            return(
                <Box sx={{padding: "10px", backgroundColor: "rgba(0,0,0,0.7)", color:"white", width:"150px", borderRadius:"5px"}}>
                    <Typography sx={{fontWeight:"bold"}}>{payload[0].name}</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography>Balance:</Typography>
                        <Typography>{data.balance.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography>Value:</Typography>
                        <Typography>{data.value.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography>Ratio:</Typography>
                        <Typography>{data.ratio.toFixed(2)}%</Typography>
                    </Box>
                </Box>
            )
        }
        return null
    }

    return(
        <PieChart width={170} height={170} >
            <Pie
                data={indexAllocation}
                paddingAngle={1}
                dataKey="ratio"
                innerRadius={65}
                outerRadius={80}
                fill="#6B2FEB"
                
            >
            {indexAllocation?.map((token, index) => (
                <Cell
                    key={index}
                    fill={paletteColorCode[index % paletteColorCode.length]} 
                />
            ))}
            </Pie>
            <Tooltip content={<CustomToolTip/>}/>
            {/* <Tooltip/> */}
        </PieChart>
    )
}

export default MyPieChart