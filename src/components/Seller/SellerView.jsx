import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useState, useEffect } from 'react'
import ViewTitle from "../CommonUiComponents/ViewTitle";
import seller from "../../assets/img/Icons/buyer.png"
import SellerController from "../../assets/controllers/SellerController";
import useAuth from "../../customHooks/useAuth";
import NoDataForSeller from './NoDataForSeller';
import TableForSeller from './TableForSeller';
import TableForProductsSold from './TableForProductsSold';
const SellerView = () => {
  const [soldType, setSoldType] = useState(0);
  const [sellerData, setSellerData] = useState([]);
  const [totalSold, setTotalSold] = useState(0);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  const handleChangeSoldType = (event) => {
    setSoldType(event.target.value);
  }
  const headers = {
    "0": [
      "Img",
      "ID",
      "Nombre",
      "Subcategoría",
      "Precio c/u",
      "Creado",
      "Acciones"
    ],
    "1": [
      "Img",
      "ID",
      "Nombre",
      "Cantidad",
      "Precio c/orden",
      "Orden",
      "Vendido a"
    ]
  }
  useEffect(() => {
    const getTotalSold = async () => {
      const { data } = await SellerController.getSoldProducts({ userId: auth?.user_id });
      let total = 0
      const filteredData = data.filter(item => item?.Orders.length > 0);
      filteredData?.forEach(item => {
        item?.Orders?.forEach(order => {
          total += order?.order_total
        })
      }
      )
      setTotalSold(total)
    }
    getTotalSold()
  }, [])
  useEffect(() => {
    const getProductsForSeller = async () => {
      try {
        let { data } = soldType == 0
          ? await SellerController.getAllProducts({ userId: auth?.user_id })
          : await SellerController.getSoldProducts({ userId: auth?.user_id })
        if (soldType == 0) {
          setSellerData(data)
        }
        else {
          let orderArray = []
          let orderProducts =
            data?.filter(item => item?.Orders.length > 0);
          orderProducts?.forEach(product => {
            product?.Orders.forEach(order => {
              orderArray.push({ order, product })
            })
          })
          console.log(orderArray)
          setOrders(orderArray)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getProductsForSeller()
  }, [soldType])
  return (
    <div className="single__product__container">
      {sellerData?.length > 0 ? (
        <>
          <Grid container>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: "10px"
              }}
              item xs={6}>
              <div><img src={seller} alt="seller" width="64" /></div>
              <div>
                <ViewTitle title="Vendedor" />
              </div>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: "10px"
              }}
              item xs={6}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={soldType}
                  onChange={handleChangeSoldType}
                >
                  <FormControlLabel value={0} control={<Radio />} label="Todos" />
                  <FormControlLabel value={1} control={<Radio />} label="Vendidos" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sx={{ my: 3 }} container>
            <Grid item xs={12}>
              {soldType == 0
                ? (<TableForSeller data={sellerData} headers={headers[0]} />)
                : (<TableForProductsSold data={orders} headers={headers[1]} />)}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  width: '100%',
                  backgroundColor: "#E5FDFF",
                  padding: "10px",
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: "1px solid #283845",
                  borderRadius: "5px",
                  fontWeight: "600",
                }}
              >
                <span>GANANCIAS TOTALES:</span>
                <span>{totalSold} €</span>
              </div>
            </Grid>
          </Grid>
        </>

      ) : (
        <NoDataForSeller />
      )}

    </div>
  )
}

export default SellerView