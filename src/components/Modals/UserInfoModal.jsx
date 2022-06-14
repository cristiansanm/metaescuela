import { useEffect, useState, forwardRef } from 'react';
import UserController from '../../assets/controllers/UserController';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import wsp from "../../assets/img/Icons/whatsapp (1).png"
import { gradesNames } from '../../assets/js/formaters';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function UserInfoModal({ type, id, open, handleClose }) {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const getMiniInfo = async () => {
            try {
                if (id) {
                    let { data } = await UserController.getMiniInfo({ userId: id })
                    setUserInfo(data?.user)
                }
            } catch (err) {
                console.log(err)
            }

        }
        getMiniInfo()
    }, [id])
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5
                }}
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
                    Detalles del {type}
                </DialogTitle>
                <hr className="modal__divider" />
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <div className="split__data">
                            <span>Nombre: </span>
                            <span>{userInfo?.user_name} {userInfo?.user_lastname}</span>
                        </div>
                        <div className="split__data">
                            <span>Grado: </span>
                            <span>
                                {gradesNames[userInfo?.user_grade]}
                            </span>
                        </div>
                        <div className="split__data">
                            <span>Teléfono: </span>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <a 
                                    target="_blank"
                                    href={`http://web.whatsapp.com/send?text=Hola&phone=+34${userInfo?.user_phone}&abid=+34${userInfo?.user_phone}`}>
                                    <img style={{cursor: 'pointer'}} src={wsp} alt="" width="24"/>
                                </a>
                                
                                {userInfo?.user_phone}
                            </span>
                        </div>
                        <div className='mail__decoration'>
                            <span>
                                <a
                                    href={`mailto:${userInfo?.user_email}`}
                                    target="_blank"
                                >
                                    {userInfo?.user_email}
                                </a>
                            </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "center" }}>
                            <button 
                                onClick={handleClose}
                                className="no__button"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}