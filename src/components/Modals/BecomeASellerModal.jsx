import { Dialog, DialogTitle } from '@mui/material'
import UserController from '../../assets/controllers/UserController'
import smiling from "../../assets/img/Icons/smiling.png"
import useAuth from '../../customHooks/useAuth'
import { useNavigate } from 'react-router-dom'
const BecomeASellerModal = ({open, handleClose}) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const setAsASeller = async () => {
        try {
            const { data } = await UserController.convertToSeller({userId: auth?.user_id})
            localStorage.setItem('user_roles', JSON.stringify(data?.user?.user_roles))
            setAuth({...auth, user_roles: data?.user?.user_roles})
            navigate('/seller')
            // handleClose()
        } catch (err) {
            console.log(err)
        }
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
                    <span>¿Quieres convertirte en un vendedor?</span>
                </DialogTitle>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px 0"
                    }}
                >
                    <img src={smiling} alt=""  width="200"/>
                </div>
                <div 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "500",
                        fontSize: "18px"
                    }}
                >
                    <span>No te arrepentirás ;)</span>
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
                        Sí
                    </button>
                    <button
                        className="no__button"
                        onClick={handleClose}
                    >
                        No
                    </button>
                </div>
            </Dialog>
        </div>
    )
}

export default BecomeASellerModal