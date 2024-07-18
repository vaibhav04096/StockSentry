import { Link } from "react-router-dom"
import style from "./nav.module.css"
const Nav=()=>{
    return(
        <div id={style.nav}>
        <div id={style.div}>
            <Link to="/">New Account</Link>
            <Link to="/exist">Exist Account</Link>
        </div>
        </div>
    )
}
export default Nav