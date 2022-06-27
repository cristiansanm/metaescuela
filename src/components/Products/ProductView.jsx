import { useEffect, useState } from 'react'
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
import useAuth from '../../customHooks/useAuth';
import LoadingLogo from '../Modals/LoadingLogo';
import EditProductModal from '../Modals/EditProductModal';
import useCart from '../../customHooks/useCart';
import SnackMessages from '../CommonUiComponents/SnackMessages';
const ProductView = () => {
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("");
    const handleCloseSnack = () => setOpenSnack(false);
    const [product, setProduct] = useState({});
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [id, setId] = useState("");
    const { auth } = useAuth();
    const idProduct = useParams();
    const { addToCart } = useCart()
    useEffect(() => {
        ProductsController.getProductById(idProduct.id)
            .then(product => setProduct(product.data))
            .catch(err => console.log(err))
    }, [])
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
    const addToCartList = () => {
        addToCart({product, product_quantity: quantity})
        setSnackMessage("Producto agregado al carrito")
        setSnackType("success")
        setOpenSnack(true)
    }
    const buyNowFunc = () => {
        addToCart({product, product_quantity: quantity})
        navigate("/cart")
    }
    let category = product?.subcategory_id_fk >= 10 ? "Tecnología" : "Libros"
    return (
        product ? (
            <div className="single__product__container">
                <Grid sx={{ mb: 3 }} container>
                    <Grid item xs={6}>
                        <IconButton
                            onClick={() => navigate(-1)}
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
                                <span>
                                    {product?.product_description ? product?.product_description :
                                        `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Quidem ex perferendis adipisci quaerat reiciendis maiores in libero 
                                blanditiis aperiam error amet, facilis delectus aspernatur, 
                                eaque nemo voluptate officia ea. Voluptate.`}
                                </span>
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
                                {(auth?.user_id == product?.seller_id_fk)
                                    ? (
                                        <button
                                            className="button__style button__buy"
                                            onClick={() => {
                                                setOpen(true)
                                                setId(product?.id)
                                            }}
                                        >
                                            Editar producto
                                        </button>
                                    )
                                    : (
                                        <>
                                            {product?.product_stock > 0 && product?.product_availability === true
                                                ? (
                                                    <>
                                                        <div className="add__cart">
                                                            <div>
                                                                <IconButton
                                                                    disabled={ product?.product_stock === quantity }
                                                                    sx={{ color: "#283845" }}
                                                                    onClick={handleQuantityAdd}
                                                                >
                                                                    <AddIcon />
                                                                </IconButton>
                                                                <span>{quantity}</span>
                                                                <IconButton
                                                                    disabled={ quantity === 1 }
                                                                    sx={{ color: "#283845" }}
                                                                    onClick={handleQuantityRemove}
                                                                >
                                                                    <RemoveIcon />
                                                                </IconButton>
                                                            </div>
                                                            <button
                                                                className="button__style button__add"
                                                                disabled={product?.product_stock <= 0}
                                                                onClick={addToCartList}
                                                            >
                                                                Añadir al carrito
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={buyNowFunc}
                                                            className="button__style button__buy"
                                                            disabled={product?.product_stock <= 0}
                                                        >
                                                            Comprar ahora
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div
                                                        style={{ 
                                                            backgroundColor: "rgb(233, 128, 116)",
                                                            color: "white",
                                                            padding: "10px",
                                                            borderRadius: "5px",
                                                        }}
                                                    >
                                                        No disponible o sin existencias
                                                    </div>
                                        )}

                                        </>
                                    )}
                                <EditProductModal open={open} handleClose={handleClose} id={id} />
                            </div>
                            <SnackMessages 
                                open={openSnack} 
                                handleClose={handleCloseSnack} 
                                type={snackType} 
                                message={snackMessage}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
            :
            (
                <LoadingLogo />
            )

    )
}

export default ProductView