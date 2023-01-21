import { Box, Container } from "@mui/material"
import IndexTable from "../../IndexTable"
import PortCard from "./PortCard"

const MyPort = () => {
    return(
        <Container>
            <PortCard/>
            <IndexTable isMyPortPage={true}/>
        </Container>
    )
}

export default MyPort