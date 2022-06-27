import React from 'react'
import ProductItem from './ProductItem'
import LoadingLogo from "../Modals/LoadingLogo"
const ProductsList = ({itemListData}) => {
  return (
    <>
    {itemListData?.length > 0 ? (
        itemListData?.map((item, index) => 
            <div key={index}>
                <ProductItem itemData = {item}/>
            </div>
        )
    ): <LoadingLogo/>}
        
    </>
  )
}

export default ProductsList