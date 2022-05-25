import React from 'react'
import ProductItem from './ProductItem'

const ProductsList = ({itemListData}) => {
  return (
    <>
    {itemListData?.length > 0 ? (
        itemListData?.map((item, index) => 
            <div key={index}>
                <ProductItem itemData = {item}/>
            </div>
        )
    ): "Cargando..."}
        
    </>
  )
}

export default ProductsList