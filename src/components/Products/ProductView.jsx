import {  useEffect, useState } from 'react'
import { Grid, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/img/Login/Logo_MetaEscuela.png"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import ProductsController from '../../assets/controllers/ProductsController';
import "../../assets/scss/ProductView/ProductView.scss"
import { fkSubcateory } from '../../assets/js/formaters';

const ProductView = () => {
    const [product, setProduct] = useState({});
    const idProduct = useParams();
    // console.log(idProduct)
    useEffect(()=>{
        ProductsController.getProductById(idProduct.id)
        .then(product => setProduct(product.data))
        .catch(err => console.log(err))
    },[])
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const handleQuantityAdd = () => {
        if (quantity < product?.product_stock) {
            setQuantity(quantity + 1)
        }
    }
    const handleQuantityRemove = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    let category = product?.subcategory_id_fk >= 10 ? "Tecnología" : "Libros"
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
                        <span>
                            {product?.User 
                            ? 
                            `${product?.User?.user_name} ${product?.User?.user_lastname}`  
                            : "usuario"}
                            </span>
                    </div>
                    <div className="second__data">
                        <span>Cantidad:</span>
                        <span>{product?.product_stock ? product?.product_stock : "0"}</span>
                    </div>
                </div>
                
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div className="single__product__body">
                    <div className="single__product__tittle">
                        <h3>{product?.product_name ? product.product_name : "Título"}</h3>
                    </div>
                    <div className="single__product__description">
                        <p>
                            {product?.product_description ? product?.product_description : 
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
                        <span>
                            {product?.subcategory_id_fk 
                            ? 
                            `${category}, ${fkSubcateory[product?.subcategory_id_fk]}`
                            : 
                            "Libro, 1º ESO"}
                        </span>
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