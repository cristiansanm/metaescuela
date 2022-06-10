import { Grid } from '@mui/material'
import React from 'react'
import TableSingleOrder from './TableSingleOrder'
import bagImg from "../../../assets/img/Icons/mejor-vendido.png"
import verifyIcon from "../../../assets/img/Icons/verificar.png"
import ViewTitle from '../../CommonUiComponents/ViewTitle'
import bagIcon from "../../../assets/img/Icons/orderIcon.png"
import woman from "../../../assets/img/Icons/mujer.png"
let headers=[
  'Img',
  'ID',
  'Nombre',
  'Cantidad',
  'Precio c/u',
  'Precio Total',
  'Vendedor'
]
const OrderView = (order) => {
  return (
    <div className="single__product__container">
      <Grid container>
        <Grid item xs={1}>
          <img src={bagIcon} alt="bag" width="48" />
        </Grid>
        <Grid item xs={11}>
          <ViewTitle title={`Orden Nº ${order?.id ? order?.id : 0}`}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
            <TableSingleOrder headers={headers}/>
          
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div>
            <div>
              <div>
                <img src={bagImg} alt="bag" width="150"/>
              </div>
              <div>
                <span>Compra verificada</span> <img src={verifyIcon} alt="" width="24"/>
              </div>
            </div>
            <hr />
            <div>
              <div>
                <span>¿Necesitas más?</span>
                <img src={woman} alt="woman" width="48"/>
              </div>
              <div>
                <button>Ir a productos</button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
    
    
  )
}

export default OrderView