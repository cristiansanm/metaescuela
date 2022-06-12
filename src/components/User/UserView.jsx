import { Grid } from '@mui/material'
import React from 'react'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import userIcon from "../../assets/img/Icons/user.png"
import logo from "../../assets/img/Login/Logo_MetaEscuela.png"
const UserView = () => {
  return (
    <div className="single__product__container">
        <Grid sx={{mb: 3}} container>
            <Grid item xs={9}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "5%",
                    gap: "10px"
                }}>
                    <img src={userIcon} alt="user" width="42" />
                    <ViewTitle title="Cuenta"/> 
                </div>
            </Grid>
            <Grid sx={{display: 'flex', justifyContent: 'flex-end', padding: "2%"}} item xs={3}>
                <img src={logo} alt="" />
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={6}>
                imagen usario
            </Grid>
            <Grid item xs={6}>
                datos de usuario
            </Grid>
        </Grid>
    </div>
  )
}

export default UserView