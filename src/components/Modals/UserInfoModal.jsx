import { useEffect, useState, forwardRef } from 'react';
import UserController from '../../assets/controllers/UserController';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
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
    })
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Detalles del {type}</DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <span>Nombre: </span>
                            <span>{userInfo?.user_name}</span>
                        </div>
                        <div>
                            <span>Grado: </span>
                            <span>
                                {gradesNames[userInfo?.user_grade]}
                            </span>
                        </div>
                        <div>
                            <span>Teléfono: </span>
                            <span>
                                <img src={wsp} alt="" width="24"/>
                                {userInfo?.user_phone}
                            </span>
                        </div>
                        <div>
                            <span>
                                <a
                                    href={`mailto:${userInfo?.user_email}`}
                                    target="_blank"
                                >
                                    {userInfo?.user_email}
                                </a>
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}