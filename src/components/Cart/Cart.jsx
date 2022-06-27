import { Grid } from '@mui/material'
import { useState } from 'react'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import cartIcon from "../../assets/img/Icons/cartIcon.png"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useCart from '../../customHooks/useCart'
import TableForCart from './TableForCart';
import EmptyCart from './EmptyCart';
import MakeAnOrderModal from '../Modals/MakeAnOrderModal';
const Cart = () => {
    const { emptyCart, calculateTotalPrice, cartList } = useCart();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const headers = [
        'Img',
        'Nombre',
        'Cantidad',
        'Vendedor',
        'Precio unitario',
        'Precio subtotal',
        'Acciones'
    ]
    return (
        <div className="single__product__container">
            {cartList?.length > 0
                ? (
                    <>
                        <Grid container>
                            <Grid sx={{ display: 'flex', alignItems: "center", gap: 5 }} item xs={4}>
                                <img src={cartIcon} alt="cart" />
                                <ViewTitle title="Carrito" />
                            </Grid>
                            <Grid sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 3
                            }} item xs={8}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    }}
                                >
                                    <span style={{ fontWeight: "500" }}>¿Te faltó añadir algo?</span>
                                    <button className="button__buy">Ir a productos</button>
                                </div>
                                <div className="empty__divider">.</div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10
                                    }}
                                >
                                    <button
                                        className="no__button"
                                        onClick={() => emptyCart()}
                                    >
                                        <DeleteOutlineIcon />
                                        Vaciar carrito
                                    </button>
                                </div>

                            </Grid>
                        </Grid>
                        <Grid sx={{ my: 3 }} container>
                            <Grid item xs={12}>
                                <TableForCart headers={headers} />
                            </Grid>
                        </Grid>
                        <Grid sx={{ my: 3 }} container>
                            <Grid item xs={6}>
                                <div>
                                    <button 
                                        className="button__buy"
                                        onClick={() => setOpen(true)}
                                    >Comprar</button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div
                                    className="single__product__total"
                                    style={{width: '100%'}}
                                >
                                    <span>TOTAL</span>
                                    <span>{calculateTotalPrice()} €</span>
                                </div>
                            </Grid>
                        </Grid>
                        <MakeAnOrderModal open={open} handleClose={handleClose}/>
                    </>
                ) : (
                <EmptyCart/>
        )}

        </div>
    )
}

export default Cart