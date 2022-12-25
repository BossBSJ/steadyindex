import { Routes, Route } from "react-router-dom"
import IndexDetail from "./pages/indexDetail"
import CreateIndex from "./pages/createIndex"
import MyPort from "./pages/myPort"
import NotFound from "./pages/notFound"
import SelectIndexes from "./pages/selectIndexes"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<SelectIndexes/>}/>
            <Route path="/createIndex" element={<CreateIndex/>}/>
            <Route path="/myPort" element={<MyPort/>}/>
            <Route path="/indexDetail/:indexId" element={<IndexDetail/>}/>
        </Routes>
    )
}

export default AppRoutes