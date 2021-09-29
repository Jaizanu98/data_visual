import {BrowserRouter as Router,Route } from "react-router-dom"
import Addprod from "./addproduct"
import Chart from "./charddashboard"
import Dashboard from "./dashboard"

const Admin=()=>{
    return (
        <div style={{marginTop:'4em'}}>
            
            <Router>
                <Route path="/admin/dashboard" component={Dashboard}></Route>
                <Route path="/admin/addprod" component={Addprod}></Route>
                <Route path="/admin/chart" component={Chart}></Route>
            </Router>
        </div>
    )
}
export default Admin