import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Nav"
import NewDashboard from "./NewDashboard"
import ExistDashboard from "./ExistDashboard"
// import Update from "./Update"
const Stocks=()=>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
                <Routes>
                    <Route element={<NewDashboard/>} path="/"/>
                    <Route element={<ExistDashboard/>} path="/exist"/>
                </Routes>
            </BrowserRouter>
           
        </div>
    )
}
export default Stocks