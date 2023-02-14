import { Box} from "@mui/material"
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react"
import DescriptionPaper from "./DescriptionCard";
import IndexTable from "../../IndexTable";
import { erc20Service } from "../../../services/erc20Service";
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory";

const SelectIndex = () => {
    const { index } = useIndexTokenFactory()

    return (

        <Container>
            <DescriptionPaper/>
            <IndexTable index={index} isMyPortPage={false}/>
        </Container>
    )
}

export default SelectIndex;