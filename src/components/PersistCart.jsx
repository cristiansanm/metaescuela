import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useCart from "../customHooks/useCart"
import LoadingLogo from "./Modals/LoadingLogo"
const PersistCart = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { setCartList } = useCart()
    

    useEffect(() => {
            const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
            setCartList(cart)
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

export default PersistCart