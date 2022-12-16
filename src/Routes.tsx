import { Routes, Route } from "react-router-dom"
import IndexDetail from "./components/indexDetail"
import CreateIndexes from "./pages/createIndexes"
import SelectIndexes from "./pages/selectIndexes"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectIndexes/>}/>
            <Route path="/createIndexes" element={<CreateIndexes/>}/>
            <Route path="/indexDetail" element={<IndexDetail/>}/>
        </Routes>
    )
}

export default AppRoutes