
import Sidebar from "./Sidebar"
import { useLocation } from "react-router-dom"

function Base({children}) {
const location = useLocation()




    return (
        <div className={`grid ${location.pathname !== '/dashboard' ? 'two' : ""}`}>

            <Sidebar />

            {children}

        </div>
    )
}

export default Base