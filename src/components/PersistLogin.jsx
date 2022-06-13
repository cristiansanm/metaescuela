import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../customHooks/useAuth"
import LoadingLogo from "./Modals/LoadingLogo"
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth, setAuth } = useAuth()
    const userData = {
        user_name:  localStorage.getItem("user_name") || "",
        user_id:  localStorage.getItem("user_id") || "",
        user_roles:  localStorage.getItem("user_roles") ? JSON.parse(localStorage.getItem("user_roles")) : [],
        user_token:  localStorage.getItem("user_token") || "",
    }
    useEffect(() => {
        setAuth(userData) 
        setIsLoading(false)
    }, [])
    return (
        <div>
            {isLoading 
            ?   <LoadingLogo/> 
            : <Outlet />}
        </div>
    )
}

export default PersistLogin