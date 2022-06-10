import React from 'react'
import "../../assets/scss/Products/ProductItem.scss"
import { convertSubCategories } from '../../assets/js/formaters'
import logo from '../../assets/img/Login/Logo_MetaEscuela.png'
import { useNavigate } from 'react-router-dom'
const verifyCharacter = (character) => 
  character.includes("_") ? true : false 
const ProductItem = ({itemData}) => {
  const navigate = useNavigate()
  return (
    <>  
        {itemData && (
            <div className='item__container'>
                <div className='item__title'>
                  <h3>{itemData?.product_name}</h3>
                  <div>
                    <span className='item__subtitle'>
                      Categoría: <b>{itemData?.product_category}</b>
                    </span>
                    <span className='item__subtitle'>
                      {" "}| Subcategoría: {" "}
                      <b>
                        {verifyCharacter(itemData?.product_subcategory) ?
                          convertSubCategories[itemData?.product_subcategory] : 
                          itemData?.product_subcategory
                          } 
                      </b>
                    </span>
                  </div>
                </div>
                <hr className='item__divider'/>
                <div className='item__image'>
                  <img src={logo} alt="log" />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                  <span
                    style={{
                      backgroundColor: itemData?.product_availability ? '#F4FBFA' : '#E98074',
                      padding: '2px 5px',
                      color: itemData?.product_availability ? '#283845' : '#F4FBFA',
                      borderRadius: '5px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {itemData?.product_availability ? "disponible" : "no disponible"}
                  </span>
                </div>
                <hr className='item__divider'/>
                <div className='item__info'>
                  <div>
                    <b>Vendedor:</b> {itemData?.product_seller}
                  </div>
                  <div>
                    <b>Precio:</b> {itemData?.product_price}
                  </div>
                </div>
                <div className='item__button'>
                  <button
                    onClick={() => navigate('/products/1')}
                  >Ver detalle</button>
                </div>
            </div>
        )}
        
    </>
  )
}

export default ProductItem