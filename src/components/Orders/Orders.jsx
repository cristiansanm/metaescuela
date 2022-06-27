import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import { Grid } from '@mui/material'
import orderIcon from '../../assets/img/Icons/orderIcon.png'
import * as ordersStyle from '../../assets/js/styleObject/Orders/OrdersStyle'
import "../../assets/scss/Orders/Orders.scss"
import OrdersTable from './OrdersTable'
import useAuth from '../../customHooks/useAuth'
import OrdersController from '../../assets/controllers/OrdersController'
import EmptyOrders from './EmptyOrders'

const Orders = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const ordersHeaders =
    [
      'ID',
      'Cantidad de productos',
      'Total',
      'Creada',
      'Ver detalle',
    ]
  const getAllOrders = async () => {
    try {
      const _orders = await OrdersController.getAllOrders({ userId: auth?.user_id });
      setOrders(_orders.data.orders);
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <div className="single__product__container">
      {orders?.length > 0 ? (
        <Grid container>
          <Grid sx={{ mb: 2 }} container>
            <Grid item xs={1}>
              <img width="64" src={orderIcon} alt="cart" />
            </Grid>
            <Grid sx={ordersStyle.ordersTitle} item xs={11}>
              <ViewTitle title="Ordenes" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <OrdersTable data={orders} headers={ordersHeaders} />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 3 }} justifyContent="center" container>
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
      ) : (
        <EmptyOrders/>
      )}

    </div>

  )
}
export default Orders;