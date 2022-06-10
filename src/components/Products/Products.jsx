import { Grid } from '@mui/material'
import {  useState, useEffect } from 'react'
import ProductsFilter from './ProductsFilter'
import ProductsList from './ProductsList'
import ProductsController from '../../assets/controllers/ProductsController'
import NavBar from '../CommonUiComponents/NavBar';
import { data } from "../../assets/js/mockupData.js"
import { productsContainer } from '../../assets/js/styleObject/Products/ProductsContainer' 
import { productFilters, productsFilterMobile, navbarStyle } from '../../assets/js/styleObject/Products/ProducFilters'
import Footer from '../CommonUiComponents/Miguel/Footer'
import ProductsFilterMobile from './ProductsFilterMobile'
const getData = async() => {
  let products = await ProductsController.getProducts();
  console.log(products)
  return products;
}
getData();
const Products =  () => {
  const [itemListData, setItemListData] = useState([])
  useEffect(() => {
    // getData()
    // .then(data => setItemListData(data))
    setItemListData(data)
  },[])
  return (
    <Grid container>
      <Grid sx={productFilters} item lg={3}>
        <ProductsFilter/>
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
    </Grid>
  )
}

export default Products