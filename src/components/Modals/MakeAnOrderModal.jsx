import { Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import useAuth from '../../customHooks/useAuth'
import useCart from '../../customHooks/useCart'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import OrdersController from '../../assets/controllers/OrdersController';
import SnackMessages from '../CommonUiComponents/SnackMessages';
import { useState } from 'react';
const MakeAnOrderModal = ({ open, handleClose, order }) => {
    const { auth } = useAuth();
    const { getCartToBuy, calculateTotalPrice, cartList, calculateSubPrice, emptyCart } = useCart();
    const navigate = useNavigate();
    const [openSnack, setOpenSnack] = useState(false)
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")
    const handleCloseSnack = () => setOpenSnack(false)
    const setAsASeller = async () => {
       
        let payload = {
            buyer_id_fk: auth?.user_id,
            order_total: calculateTotalPrice(),
            products: getCartToBuy()
        }
        await OrdersController.createOrder(payload)
        .then(res => {
            handleClose()
            setMessage(res.data.message)
            setType("success")
            setOpenSnack(true)
            setTimeout(()=>{
                emptyCart()
                navigate('/orders')
            }, 2000)
            
        }).catch(err => {
            setMessage(err.message)
            setType("error")
            setOpenSnack(true)
        })
            // handleClose()
        
    }
    return (
        <div>
            <Dialog
                sx={{
                    maxHeight: "600px",
                }}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Poppins, serif",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        color: "#283845"
                    }}
                >
                    <span>Resumen de tu orden</span>
                </DialogTitle>
                <hr className="modal__divider" />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px 0"
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartList.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.product?.product_name}
                                        </TableCell>
                                        <TableCell align="right">{row?.product_quantity}</TableCell>
                                        <TableCell align="right">
                                            {calculateSubPrice(row?.product?.product_price, row?.product_quantity)} €
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "500",
                        fontSize: "18px",
                        padding: "0 10px"
                    }}
                >
                    <span>TOTAL</span>
                    <span>{calculateTotalPrice()} €</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "500",
                        fontSize: "18px",
                        gap: "10px",
                        margin: "10px 0"
                    }}
                >
                    <button
                        className="button__buy"
                        onClick={setAsASeller}
                    >
                        Realizar pedido
                    </button>
                </div>
            </Dialog>
            <SnackMessages open={openSnack} type={type} message={message} handleClose={handleCloseSnack}/>
        </div>
    )
}

export default MakeAnOrderModal