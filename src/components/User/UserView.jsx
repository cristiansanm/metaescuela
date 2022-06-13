import { Grid, Snackbar, TextField } from '@mui/material'
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


const UserView = () => {
    const [user, setUser] = useState({});
    const [uploadImg, setUploadImg] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const { auth } = useAuth();
    // console.log(iduser)
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

        setImageUpload(e.target.files[0]);
        let img = URL.createObjectURL(e.target.files[0]);
        setUploadImg(img)


    }
    const uploadImgFunc = async (e) => {
        const imageRef = ref(storage, `Usuarios/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                let payload = {
                    userId: auth?.user_id,
                    img: url
                }
                UserController.addProfilePhoto(payload)
                    .then(res => {
                        console.log(res)
                        setImageUpload(null)
                        setUploadImg(null)
                        window.location.reload()
                    })
                    .catch(error => console.log(error))

            })
        })
    }

    const deletePhoto = async () => {
        await UserController.deleteProfilePhoto({
            userId: auth?.user_id
        })
            .then(res => {console.log(res); window.location.reload()})
            .catch(error => console.log(error))
    }
    ///////////////// editar usuario
    const [editUser, setEditUser] = useState(false)

    return (
        <div className="single__product__container">
            <Grid sx={{ mb: 3 }} container>
                <Grid item xs={9}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: "5%",
                        gap: "10px"

                    }}>
                        <img src={userIcon} alt="user" width="42" />
                        <ViewTitle title="Perfil de usuario" />
                    </div>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end', padding: "2%" }} item xs={3}>
                    <img src={logo} alt="" />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} id="userimagen">
                    imagen usario
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
                                <img src={uploadImg} alt="imgupload" width="150" />
                                <button id="editprofile" onClick={() => setUploadImg("")}>Eliminiar</button>
                                <button id="editprofile2" onClick={uploadImgFunc}>Actualizar foto</button>

                            </div>)
                            : (
                                <div className="insert__image__container">
                                    <label htmlFor="inputPhoto">
                                        <div>
                                            <img src={user?.user_profile_image ? user.user_profile_image : Avatar} width="80%" alt="" />
                                        </div>
                                        <input type="file" accept="image/*" name="image" id="file" onChange={handleUploadImg} />
                                    </label>
                                    {
                                        user?.user_profile_image && <button id="editprofile" onClick={deletePhoto}> Eliminar foto actual</button>
                                    }

                                </div>
                            )

                        }
                    </div>

                </Grid>
                <Grid item xs={6} id="userdata">

                    {editUser ?
                        (
                            <UserEditForm />


                        ) : (
                            <>

                                <div id='separa'>
                                    <span>
                                        Nombre
                                    </span>
                                    <span id="separa"> {user?.user_name ? user.user_name : "-"} </span>
                                </div>
                                <hr />
                                <div id='separa'>
                                    <span>
                                        Apellido
                                    </span>
                                    <span id="separa"> {user?.user_lastname ? user.user_lastname : "-"} </span>
                                </div>
                                <hr />
                                <div id='separa'>
                                    <span>
                                        Grado
                                    </span>
                                    <span id="separa"> {user?.user_grade ? user.user_grade : "-"} </span>

                                </div>
                                <hr />
                                <div id='separa'>
                                    <span>
                                        Telefono
                                    </span>
                                    <span id="separa"> {user?.user_phone ? user.user_phone : "-"} </span>
                                </div>
                                <hr />
                                <div id='separa'>
                                    <span>
                                        Roles
                                    </span>
                                    <span id="separa"> {user?.user_is_buyer === true ? "Comprador" : ""}{user?.user_is_seller === true ? "Vendedor" : ""} </span>
                                </div>
                                <div id='botyspan'>

                                    <button id='editprofile' onClick={() => setEditUser(true)}>Editar perfil</button> <span id='lastspan'>¿Quieres ser vendedor?</span>

                                </div>
                            </>

                        )

                    }

                </Grid>
            </Grid>


        </div>
    )
}

export default UserView