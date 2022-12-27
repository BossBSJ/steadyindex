import { Box} from "@mui/material"
import { Container } from "@mui/system";
import React, { useState } from "react"
import DescriptionPaper from "./DescriptionCard";
import IndexTable from "../../IndexTable";

const SelectIndex = () => {
    return (
        <Container>
            <DescriptionPaper/>
            <IndexTable/>
        </Container>
    )
}

export default SelectIndex;