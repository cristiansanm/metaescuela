import { Button, Grid,} from '@mui/material'
import React from 'react'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import userIcon from "../../assets/img/Icons/user.png"
import logo from "../../assets/img/Login/Logo_MetaEscuela.png"
import UserController from "../../assets/controllers/UserController"
import { useEffect, useState } from 'react'
import Avatar from '../../assets/img/Icons/avatar.png'
import useAuth from '../../customHooks/useAuth'
import {
    ref,
    uploadBytes,
    getDownloadURL

} from "firebase/storage";
import { storage } from "../../firebase/firebasedb";
import UserEditForm from './UserEditForm'
import "../../assets/scss/User/UserView.scss"
import SnackMessages from '../CommonUiComponents/SnackMessages'
import BecomeASellerModal from '../Modals/BecomeASellerModal'
import { gradesNames } from '../../assets/js/formaters'

const UserView = () => {
    ///////////////// editar usuario
    const [editUser, setEditUser] = useState(false)
    const handleEditUser = () => setEditUser(false)
    const [user, setUser] = useState({});
    const [uploadImg, setUploadImg2] = useState('');
    const [imageUpload2, setImageUpload2] = useState(null);
    // Varaibles para el snack
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const handleClose = () => setOpen(false);
    //Variables para el modal
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false)
    const { auth } = useAuth();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        UserController.getOneUser({ userId: auth?.user_id })
            .then(user => isMounted && setUser(user.data.user))
            .catch(err => console.log(err))

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleUploadImg = (e) => {

        setImageUpload2(e.target.files[0]);
        let img = URL.createObjectURL(e.target.files[0]);
        setUploadImg2(img)


    }
    const uploadImgFunc = async (e) => {
        const imageRef = ref(storage, `Usuarios/${imageUpload2.name}`);
        uploadBytes(imageRef, imageUpload2).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                let payload = {
                    userId: auth?.user_id,
                    img: url
                }
                UserController.addProfilePhoto(payload)
                    .then(res => {
                        setMessage("Foto actualizada correctamente")
                        setType("success")
                        setOpen(true)
                        setImageUpload2(null)
                        setUploadImg2(null)
                        setTimeout(()=>{
                            window.location.reload()
                        }, 2000)
                    })
                    .catch(error => {
                        setMessage("Error al actualizar la foto")
                        setType("error")
                        setOpen(true)
                        console.log(error)
                    })

            })
        })
    }

    const deletePhoto = async () => {
        await UserController.deleteProfilePhoto({
            userId: auth?.user_id
        })
            .then(res => { 
                setMessage("Foto eliminada correctamente") 
                setType("success")
                setOpen(true)
                setTimeout(() => {
                    window.location.reload() 
                }, 2000) 
            })
            .catch(error => {
                console.log(error)
                setMessage("Error al eliminar la foto")
                setType("error")
                setOpen(true)
            })
    }


    return (
        <div className="single__product__container">
            <Grid sx={{ mb: 3 }} container>
                <Grid item xs={9}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px"

                    }}>
                        <img src={userIcon} alt="user" width="42" />
                        <ViewTitle title="Perfil de usuario" />
                    </div>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={3}>
                    <img src={logo} alt="" width="100" />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} id="userimagen">
                    <div id="imgUser"></div>
                    <div id="btnUser">
                        {uploadImg ?
                            (<div
                                style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            >
                                <img src={uploadImg} alt="imgupload" width="350" />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "10px",
                                        marginTop: "20px"
                                    }}
                                >
                                    <button className='no__button' onClick={() => setUploadImg2("")}>Eliminiar</button>
                                    <button className='button__buy' onClick={uploadImgFunc}>Actualizar foto</button>
                                </div>


                            </div>)
                            : (
                                <div className="no__photo__container">
                                    <div
                                        style={{
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <img src={user?.user_profile_image ? user.user_profile_image : Avatar} width="350" alt="" />
                                    </div>
                                    {!user?.user_profile_image &&
                                        (<>
                                            <label htmlFor="inputPhoto2">
                                                <span
                                                    style={{
                                                        padding: "5px 15px",
                                                    }}
                                                    className="button__buy"
                                                >Cambiar foto</span>
                                                <input type="file" accept="image/*" name="inputPhoto2" id="inputPhoto2" onChange={handleUploadImg} />
                                            </label>
                                        </>)}

                                    {
                                        user?.user_profile_image && <button className="no__button" onClick={deletePhoto}> Eliminar foto</button>
                                    }

                                </div>
                            )

                        }
                    </div>

                </Grid>
                <Grid item xs={6} id="userdata">

                    {editUser ?
                        (
                            <UserEditForm getBack={handleEditUser} />
                        ) : (
                            <div 
                                style={{padding: "30px"}}
                                className="data__container">
                                
                                <div className="split__data">
                                    <span>
                                        Nombre
                                    </span>
                                    <span> {user?.user_name ? user.user_name : "-"} </span>
                                </div>
                                <hr />
                                <div className="split__data">
                                    <span>
                                        Apellido
                                    </span>
                                    <span> {user?.user_lastname ? user.user_lastname : "-"} </span>
                                </div>
                                <hr />
                                <div className="split__data">
                                    <span>
                                        Grado
                                    </span>
                                    <span> {user?.user_grade ? gradesNames[user.user_grade] : "-"} </span>

                                </div>
                                <hr />
                                <div className="split__data">
                                    <span>
                                        Email
                                    </span>
                                    <span> {user?.user_email ? user.user_email : "-"} </span>
                                </div>
                                <hr />
                                <div className="split__data">
                                    <span>
                                        Télefono
                                    </span>
                                    <span> {user?.user_phone ? user.user_phone : "-"} </span>
                                </div>
                                <hr />
                                <div className="split__data">
                                    <span>
                                        Roles
                                    </span>
                                    <span> {user?.user_is_buyer === true ? "Comprador, " : ""}{user?.user_is_seller === true ? "Vendedor" : ""} </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "20px"
                                    }}
                                >

                                    <Button color="error" onClick={() => setEditUser(true)}>Editar perfil</Button>
                                    {!auth?.user_roles?.includes("SELLER") && (
                                        <Button 
                                            onClick={() => setOpenModal(true)}
                                            sx={{color: "#4399A5"}} 
                                        >¿Quieres ser vendedor?</Button>
                                    )}
                                    

                                </div>
                            </div>
                        )
                    }

                </Grid>
            </Grid>
        <BecomeASellerModal open={openModal} handleClose={handleCloseModal}/>
        <SnackMessages 
            open={open} 
            handleClose={handleClose}
            message={message}
            type={type}
        />
        </div>
    )
}

export default UserView