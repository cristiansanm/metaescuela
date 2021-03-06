import { Grid } from '@mui/material'
import {  useState, useEffect } from 'react'
import ProductsFilter from './ProductsFilter'
import ProductsList from './ProductsList'
import ProductsController from '../../assets/controllers/ProductsController'
import { productsContainer } from '../../assets/js/styleObject/Products/ProductsContainer' 
import { productFilters, productsFilterMobile } from '../../assets/js/styleObject/Products/ProducFilters'
import Footer from '../CommonUiComponents/Miguel/Footer'
import ProductsFilterMobile from './ProductsFilterMobile'
import SnackMessages from '../CommonUiComponents/SnackMessages'
import useAuth from '../../customHooks/useAuth'

const Products =  () => {
  const[open, setOpen]= useState(false);
  const[message, setMessage]= useState("")
  const[type, setType]= useState("")
  const handleClose = () => setOpen(false);
  const [itemListData, setItemListData] = useState([])
  const [filters, setFilters] = useState({});
  const { auth } = useAuth();
  
  const handleFilters = (payload) => {
    setFilters(payload);
  }
  useEffect(() => {
    (Object.keys(filters).length > 0) ? 
      ProductsController.getProductsByFilter({filters, id: {userId: auth?.user_id}})
      .then(products => {let { data } = products; setItemListData(data)})
      .catch(err => {
        setMessage("No se ha encontrado la consulta requerida")
        setType("error")
        setOpen(true)
      })
     : 
        ProductsController.getProducts({userId: auth?.user_id})
        .then(products => {
          let { data } = products;
          setItemListData(data)
        }).catch(err => {
          console.log(err)
        })
    
  },[filters])
  return (
    <Grid container>
      <Grid sx={productFilters} item lg={3}>
        <ProductsFilter setFiltersFunc={handleFilters}/>
      </Grid>
      <Grid sx={productsFilterMobile} item xs={12}>
        <ProductsFilterMobile/>
      </Grid>
      <Grid sx={productsContainer} item xs={12} sm={12} md={12} lg={9}>
        <ProductsList itemListData={itemListData}/>
      </Grid>
      <Grid item xs={12}>
        <Footer/>
      </Grid>
      <SnackMessages
        open={open}
        handleClose={handleClose}
        message={message}
        type={type}
      />
    </Grid>
  )
}

export default Products