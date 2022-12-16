import { Box} from "@mui/material"
import { Container } from "@mui/system";
import React, { useState } from "react"
import DescriptionPaper from "../components/descriptionCard";
import IndexTable from "../components/indexTable";

const SelectIndexes = () => {
    return (
        <Container>
            <DescriptionPaper/>
            <IndexTable/>
        </Container>
    )
}

export default SelectIndexes;