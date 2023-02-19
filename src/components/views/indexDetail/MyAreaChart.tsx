import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Area, AreaChart, Legend, XAxis, Tooltip, YAxis } from "recharts"
import { historyPrice } from "../../../interfaces/historyPrice.interface"

const mockHistoryPrice = [
    // {
    //     date:"13th Nov",
    //     price: 70.8
    // },
    // {
    //     date:"14th Nov",
    //     price: 80
    // },
    // {
    //     date:"15th Nov",
    //     price: 90
    // },
    // {
    //     date:"16th Nov",
    //     price: 85
    // },
    // {
    //     date:"17th Nov",
    //     price: 87
    // },
    {
        date:"18th Nov",
        price: 500
    },
]

type IProps = {
    historyPrice: historyPrice[]
}

const MyAreaChart = (props: IProps) => {

    const { historyPrice } = props

    const areaColor = "rgba(0, 95, 255, 0.5)"
    
    return(
        <AreaChart
            width={1123}
            height={300}
            data={historyPrice}
        >
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <Tooltip/>
            <Area
                type="monotone"
                dataKey="price"
                stroke={areaColor}
                fill={areaColor}
                activeDot={{ r: 3 }}
            />
        </AreaChart>
    )
}

export default MyAreaChart