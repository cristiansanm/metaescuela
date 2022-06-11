import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import MenuAppBar from '../CommonUiComponents/Miguel/Footer'
import { Grid } from '@mui/material'
import orderIcon from '../../assets/img/Icons/orderIcon.png'
import * as ordersStyle from '../../assets/js/styleObject/Orders/OrdersStyle'
import "../../assets/scss/Orders/Orders.scss"
import OrdersTable from './OrdersTable'
const Orders = () => {
  const navigate = useNavigate();
  const ordersHeaders = 
  [
    'ID', 
    'Cantidad de productos', 
    'Total', 
    'Creada', 
    'Ver detalle', 
  ]
  return (
    <>
      <Grid sx={ordersStyle.ordersContainer} container>
        <Grid container>
          <Grid item xs={1}>
            <img width="64" src={orderIcon} alt="cart"/>
          </Grid>
          <Grid sx={ordersStyle.ordersTitle} item xs={11}>
            <ViewTitle title="Ordenes" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <OrdersTable data={''} headers={ordersHeaders}/>
          </Grid>
        </Grid>
        <Grid sx={{mt:3}} justifyContent="center" container>
          <Grid item sx={3}>
            <button
              className='button__orders__return'
              onClick={() => navigate('/products')}
            >
              Ir a productos
            </button>
          </Grid>
        </Grid>
      </Grid>
      <MenuAppBar/>
    </>
    
    )}
export default Orders;