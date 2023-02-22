import { Box} from "@mui/material"
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react"
import DescriptionPaper from "./DescriptionCard";
import IndexTable from "../../IndexTable";
import { erc20Service } from "../../../services/erc20Service";
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory";
import { Address, useContractRead } from "wagmi";
import { INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS } from "../../../constants/constants";
import { INDEX_TOKEN_FACTORY_CONTRACT_ABI } from "../../../constants/abi";
import { IndexOnTable } from "../../../interfaces/indexOnTable.interface";

const SelectIndex = () => {
    const [indexTokenAddress, setIndexTokenAddress] = useState<readonly Address[] >()
    const [allIndex, setAllIndex] = useState<IndexOnTable[]>()

    const getIndexTokensRead  = useContractRead({
        address: INDEX_TOKEN_FACTORY_CONTRACT_ADDRESS,
        abi: INDEX_TOKEN_FACTORY_CONTRACT_ABI,
        functionName: "getIndexs",
    })


    useEffect(() => {
        if(!getIndexTokensRead) return
        const tmpIndexTokenAddress = getIndexTokensRead.data
        setIndexTokenAddress(tmpIndexTokenAddress)

    }, [getIndexTokensRead.data])


    const { index } = useIndexTokenFactory(indexTokenAddress)


    useEffect(() => {
        if(!index) return
        setAllIndex(index)
    }, [index])

    return (

        <Container>
            <DescriptionPaper/>
            <IndexTable index={allIndex} isMyPortPage={false}/>
        </Container>
    )
}

export default SelectIndex;