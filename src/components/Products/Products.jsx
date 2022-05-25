import { Grid } from '@mui/material'
import {  useState, useEffect } from 'react'
import ProductsFilter from './ProductsFilter'
import ProductsList from './ProductsList'
import ProductsController from '../../assets/controllers/ProductsController'
import NavBar from '../CommonUiComponents/NavBar';
import { data } from "../../assets/js/mockupData.js"
import { productsContainer } from '../../assets/js/styleObject/Products/ProductsContainer' 
import { productFilters } from '../../assets/js/styleObject/Products/ProducFilters'
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
      <Grid item xs={12}>
        <NavBar/>
      </Grid>
      <Grid sx={productFilters} item xs={12} sm={12} md={3}>
        <ProductsFilter/>
      </Grid>
      <Grid sx={productsContainer} item xs={12} sm={12} md={9}>
        <ProductsList itemListData={itemListData}/>
      </Grid>
    </Grid>
  )
}

export default Products