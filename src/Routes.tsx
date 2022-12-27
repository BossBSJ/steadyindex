import { Routes, Route } from "react-router-dom"
import IndexDetail from "./components/views/indexDetail/IndexDetail"
import CreateIndex from "./components/views/createIndex/CreateIndex"
import MyPort from "./components/views/myPort/MyPort"
import NotFound from "./components/views/notFound/NotFound"
import SelectIndex from "./components/views/selectIndex/SelectIndex"
import { RouteName } from "./constants/constants"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path={RouteName.default} element={<SelectIndex/>}/>
            <Route path={RouteName.createIndex} element={<CreateIndex/>}/>
            <Route path={RouteName.myPort} element={<MyPort/>}/>
            <Route path={`${RouteName.indexDetail}/:indexId`} element={<IndexDetail/>}/>
        </Routes>
    )
}

export default AppRoutes