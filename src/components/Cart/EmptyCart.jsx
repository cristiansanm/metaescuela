import { Grid } from '@mui/material'
import cart from '../../assets/img/Icons/cart.png'
import sad from "../../assets/img/Icons/sad.png"
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => {
    const navigate = useNavigate();
    return (
        <Grid
            direction="column"
            justifyContent="center"
            alignItems="center"
            container
            spacing={5}
        >
            <Grid item>
                <div className="empty__title">
                    <span>Tu carrito está vacío...</span>
                    <img src={sad} alt="sad" width="48" height="48" />
                </div>
            </Grid>
            <Grid item>
                <img className="empty__central__img" src={cart} alt="emptyBox" width="350" />
            </Grid>
            <Grid item>
                <div className="empty__buttons">
                    <div>
                        <span>¿Quieres ver nuevas cosas?</span>
                        <button
                            className="button__orders__return"
                            onClick={() => navigate('/products')}
                        >
                            Ir a productos
                        </button>
                    </div>
                    <div className="empty__divider">.</div>
                    <div>
                        <span>O si deseas ver tus órdemes:</span>
                        <button
                            className="button__orders__return"
                            onClick={() => navigate('/orders')}
                        >
                            Ir a órdenes
                        </button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default EmptyCart