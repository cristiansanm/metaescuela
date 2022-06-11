import { Grid } from '@mui/material'
import {  useState, useEffect } from 'react'
import ProductsFilter from './ProductsFilter'
import ProductsList from './ProductsList'
import ProductsController from '../../assets/controllers/ProductsController'
import { data } from "../../assets/js/mockupData.js"
import { productsContainer } from '../../assets/js/styleObject/Products/ProductsContainer' 
import { productFilters, productsFilterMobile } from '../../assets/js/styleObject/Products/ProducFilters'
import Footer from '../CommonUiComponents/Miguel/Footer'
import ProductsFilterMobile from './ProductsFilterMobile'


const Products =  () => {
  const [itemListData, setItemListData] = useState([])
  const userId = localStorage.getItem('id')
  console.log(localStorage.getItem('id'))
  console.log(localStorage.getItem('user'))
  useEffect(() => {
    ProductsController.getProducts({userId})
    .then(products => {
      let { data } = products;
      setItemListData(data)
    }).catch(err => {
      console.log(err)
    })
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