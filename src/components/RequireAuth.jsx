import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../customHooks/useAuth"
const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const  location = useLocation();

    return(
        auth?.user_roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/> 
            : auth?.user_id 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace/>  
                : <Navigate to="/login" state={{ from: location }} replace/>
    )   
}

export default RequireAuth