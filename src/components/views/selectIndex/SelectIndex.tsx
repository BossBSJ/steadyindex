import { Box} from "@mui/material"
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react"
import DescriptionPaper from "./DescriptionCard";
import IndexTable from "../../IndexTable";
import { erc20Service } from "../../../services/erc20Service";

const SelectIndex = () => {
    

    // useEffect(() => {
    //     const price = erc20Service.fetchERC20Price('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7')

    // },[])
    


    return (

        <Container>
            <DescriptionPaper/>
            <IndexTable isMyPortPage={false}/>
        </Container>
    )
}

export default SelectIndex;