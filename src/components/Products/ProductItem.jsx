import React from 'react'
import "../../assets/scss/Products/ProductItem.scss"
import { fkSubcateory } from '../../assets/js/formaters'
import logo from '../../assets/img/Login/Logo_MetaEscuela.png'
import { useNavigate } from 'react-router-dom'

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
                      Categoría: 
                      <b>
                        {itemData?.subcategory_id_fk >= 10 
                        ?
                          "Tecnología" : "Libros"}
                      </b>
                    </span>
                    <span className='item__subtitle'>
                      {" "}| Subcategoría: {" "}
                      <b>
                        {fkSubcateory[itemData?.subcategory_id_fk]}
                      </b>
                    </span>
                  </div>
                </div>
                <hr className='item__divider'/>
                <div className='item__image'>
                  <img 
                    src={itemData?.product_image ? itemData.product_image : logo } 
                    alt="log" 
                    width="120"
                    style={{objectFit: "cover"}}
                  />
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
                    <b>Vendedor:</b> {itemData?.User?.user_name}
                  </div>
                  <div>
                    <b>Precio:</b> {itemData?.product_price} €
                  </div>
                </div>
                <div className='item__button'>
                  <button
                    onClick={() => navigate(`/products/${itemData?.id}`)}
                  >Ver detalle</button>
                </div>
            </div>
        )}
        
    </>
  )
}

export default ProductItem