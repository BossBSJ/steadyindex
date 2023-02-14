import { Box, Container } from "@mui/material"
import { useIndexTokenFactory } from "../../../hooks/useIndexTokenFactory"
import IndexTable from "../../IndexTable"
import PortCard from "./PortCard"

const MyPort = () => {
    
    const { index } = useIndexTokenFactory()

    return(
        <Container>
            <PortCard/>
            <IndexTable index={index} isMyPortPage={true}/>
        </Container>
    )
}

export default MyPort