import { Grid } from '@mui/material'
import React from 'react'
import error from "../../assets/img/Icons/error.png"
import ViewTitle from './ViewTitle'
import { useNavigate } from 'react-router-dom'
const Missing = () => {
  const navigate = useNavigate()
  return (
    <div
    className="single__product__container"
    >
      <Grid container>
        <Grid sx={{display: 'flex', justifyContent: 'center'}} item xs={12}>
          <img src={error} alt="" />
        </Grid>
        <Grid sx={{display: 'flex', justifyContent: 'center', margin: "20px 0"}} xs={12}>
          <ViewTitle title={"Oops, la página que buscas no existe"}></ViewTitle>
        </Grid>
        <Grid sx={{display: 'flex', justifyContent: 'center'}} item xs={12}>
          <button
            className="button__buy"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Missing