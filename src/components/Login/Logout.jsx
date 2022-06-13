import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    const logOutFunction = () => {
        localStorage.setItem('user_id', "")
        localStorage.setItem('user_roles', "")
        localStorage.setItem('user_token', "")
        localStorage.setItem('user_name', "")
        navigate('/login')
    }
    return (
        <>
            <Tooltip title="Salir">
                <IconButton
                    onClick={logOutFunction} 
                    sx={{backgroundColor: "#EF6151", display: "flex", justifyContent: "center"}}>
                    <LogoutIcon sx={{color: "#F4FBFA"}}/>
                </IconButton>
            </Tooltip>
            
        </>
    )
}

export default Logout