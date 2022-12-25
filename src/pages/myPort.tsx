import { Box, Container } from "@mui/material"
import IndexTable from "../components/indexTable"
import PortCard from "../components/portCard"

const MyPort = () => {
    return(
        <Container>
            <PortCard/>
            <IndexTable/>
        </Container>
    )
}

export default MyPort