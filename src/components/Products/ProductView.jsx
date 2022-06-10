import {  useState } from 'react'
import { Button, Grid, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/img/Login/Logo_MetaEscuela.png"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { singleProductContainer } from '../../assets/js/styleObject/ProductView/ProductView';
import "../../assets/scss/ProductView/ProductView.scss"
const ProductView = (product) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const handleQuantityAdd = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1)
        }
    }
    const handleQuantityRemove = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
  return (
    <div className="single__product__container">
        <Grid sx={{mb: 3}} container>
            <Grid item xs={6}>
                <IconButton
                    onClick={() => navigate('/products')}
                    sx={{
                        backgroundColor: "#283845",
                        color: "#F4FBFA",
                    }}
                    variant="contained"
                >
                    <ArrowBackIcon />
                </IconButton>
            </Grid>
            <Grid item xs={6}>
                <div className="single__product__header">
                    <div className="first__data">
                        <span>Vendido por:</span>
                        <span>{product?.seller ? product?.seller.user_name : "usuario"}</span>
                    </div>
                    <div className="second__data">
                        <span>Cantidad:</span>
                        <span>{product?.stock ? product?.quantity : "0"}</span>
                    </div>
                </div>
                
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div className="single__product__body">
                    <div className="single__product__tittle">
                        <h3>{product?.produc_name ? product.produc_name : "Título"}</h3>
                    </div>
                    <div className="single__product__description">
                        <p>
                            {product?.product_name ? product?.product_name : 
                                `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Quidem ex perferendis adipisci quaerat reiciendis maiores in libero 
                                blanditiis aperiam error amet, facilis delectus aspernatur, 
                                eaque nemo voluptate officia ea. Voluptate.`}
                        </p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="single__product__body">
                    <div className="single__product__iamge">
                        <img 
                            src={product?.product_image ? 
                                    product?.product_image : logo} 
                            alt="product img" 
                            width="250"
                        />
                    </div>
                    <div className="single__product__info">
                        <span>{product?.product_subcategory ? 
                            product?.product_subcategory : "Libro, 1º ESO"}</span>
                        <span>
                            {product?.product_price ? 
                                product?.product_price : "0"} €
                        </span>
                    </div>
                    <div className="single__product__buttons">
                        <div className="add__cart">
                            <div>
                                <IconButton
                                    sx={{color: "#283845"}}
                                    onClick={handleQuantityAdd}
                                >
                                    <AddIcon/>
                                </IconButton>
                                <span>{quantity}</span>
                                <IconButton
                                    sx={{color: "#283845"}}
                                    onClick={handleQuantityRemove}
                                >
                                    <RemoveIcon/>
                                </IconButton>
                            </div>
                            <button className="button__style button__add">Añadir al carrito</button>
                        </div>
                        <button className="button__style button__buy">Comprar ahora</button>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default ProductView