import { Grid, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import TableSingleOrder from './TableSingleOrder'
import ViewTitle from '../../CommonUiComponents/ViewTitle'
import bagIcon from "../../../assets/img/Icons/orderIcon.png"
import OrdersController from "../../../assets/controllers/OrdersController"
import useAuth from "../../../customHooks/useAuth"
import { useParams, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../../assets/scss/Orders/SingleOrder.scss"
import SecondColumn from './SecondColumn'
let headers = [
  'Img',
  'ID',
  'Nombre',
  'Cantidad',
  'Precio c/u',
  'Precio Total',
  'Vendedor'
]
const OrderView = (order) => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const [orderData, setOrderData] = useState({});
  const { id } = useParams()
  const getOneOrder = async () => {
    try {
      const _order = await OrdersController.getOneOrder({ id: { userId: auth?.user_id }, orderId: id });
      setOrderData(_order.data.order);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getOneOrder()
  }, [])
  return (
    <div className="single__product__container">
      <Grid sx={{ mb: 4 }} container>
        <Grid  item xs={12}>
          <IconButton
            sx={{
              backgroundColor: "#283845",
              color: "#F4FBFA"
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid
          sx={{
            backgroundColor: "#EAF4F4",
            padding: "40px 30px",
            borderRadius: "14px",
            border: "1px solid #283845"
          }}
          item
          xs={12}
          sm={12}
          md={9}
        >
          <div className="single__order__title">
            <img src={bagIcon} alt="bag" width="48" />
            <ViewTitle title={`Orden Nº ${orderData?.id ? orderData?.id : 0}`} />
          </div>
          <div>
            <TableSingleOrder data={orderData} headers={headers} />
          </div>
          <div className="single__product__total">
            <span>TOTAL</span>
            <span>{orderData?.order_total} €</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <SecondColumn/>
        </Grid>
      </Grid>
    </div>


  )
}

export default OrderView