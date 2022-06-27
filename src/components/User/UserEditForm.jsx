import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { textFieldBg } from '../../assets/js/styleObject/Login/TextFieldStyle';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import SnackMessages from '../CommonUiComponents/SnackMessages';
import { gradesArray } from '../../assets/js/formaters';
import UserController from '../../assets/controllers/UserController';
import useAuth from '../../customHooks/useAuth'
const UserEditForm = ({ getBack }) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const handleClose = () => setOpen(false);
    const { auth } = useAuth();
    const [grade, setGrade] = useState("")
    const handleChangeGrade = (e) => setGrade(e.target.value)

    const sendDataForEdit = async () => {
        let payload = {
            user_name: getValues("name"),
            user_lastname: getValues("lastName"),
            user_grade: grade,
            user_email: getValues("email"),
            user_phone: getValues("phone"),
            userId: auth?.user_id
        }
        UserController.editUser(payload)
            .then(res => {
                setOpen(true)
                setMessage("Usuario editado correctamente")
                setType("success")
                setTimeout(() => {
                    window.location.reload()
                }, 2000)

            }).catch(error => {
                setOpen(true)
                setMessage("Error al editar el usuario")
                setType("error")
            })
    }

    useEffect(() => {

        UserController.getOneUser({ userId: auth?.user_id })
            .then(_user => {
                console.log(_user)
                let { data } = _user
                setValue("name", data.user?.user_name)
                setValue("lastName", data.user?.user_lastname)
                setValue("email", data.user?.user_email)
                setValue("phone", data.user?.user_phone)
                setGrade(data.user?.user_grade)

            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    return (
        <form onSubmit={handleSubmit(sendDataForEdit)}>
            <div
                style={{ padding: "30px" }}
                className="data__container">

                <div className="split__data">
                    <span>
                        Nombre
                    </span>
                    <span>
                        <TextField
                            name="name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "El nombre es requerido",
                                },
                                pattern: {
                                    value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                                    message: "El nombre solo puede contener letras"
                                }
                            })}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name.message : ""}
                            sx={textFieldBg}
                            label="Nombre"
                        />
                    </span>
                </div>
                <hr />
                <div className="split__data">
                    <span>
                        Apellido
                    </span>
                    <span>
                        <TextField
                            name="lastName"
                            {...register("lastName", {
                                pattern: {
                                    value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                                    message: "El apellido solo puede contener letras"
                                }
                            })}
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName ? errors.lastName.message : ""}
                            sx={textFieldBg}
                            label="Apellido"
                        />
                    </span>
                </div>
                <hr />
                <div className="split__data">
                    <span>
                        Grado
                    </span>
                    <span>
                        <FormControl fullWidth>
                            <InputLabel id="grade-select">Grado</InputLabel>
                            <Select
                                name="grade"
                                sx={textFieldBg}
                                labelId="grade-select"
                                value={grade}
                                label="Grade"
                                onChange={handleChangeGrade}
                                required
                            >
                                {gradesArray.map(grade =>
                                    <MenuItem key={grade} value={grade.value}>{grade.label}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </span>

                </div>
                <hr />
                <div className="split__data">
                    <span>
                        Email
                    </span>
                    <span>
                        <TextField
                            name="email"
                            {...register("email", {

                            })}
                            error={errors.email ? true : false}
                            helperText={errors.email ? errors.email.message : ""}
                            sx={textFieldBg}
                            label="Email"
                        />
                    </span>
                </div>
                <hr />
                <div className="split__data">
                    <span>
                        Télefono
                    </span>
                    <span>
                        <TextField
                            sx={textFieldBg}
                            label="Teléfono"
                            name="phone"
                            {...register("phone", {

                                valueAsNumber: {
                                    value: true,
                                    message: "El teléfono debe ser un número",
                                },
                                minLength: {
                                    value: 9,
                                    message: "El teléfono debe tener 9 dígitos",
                                }
                            })}
                            error={errors.phone ? true : false}
                            helperText={errors.phone ? errors.phone.message : ""}
                        />
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px"
                    }}
                >
                    <button className='button__buy' type="submit">Actualizar</button>
                    <button onClick={getBack} className="no__button">Cancelar</button>
                </div>
            </div>

            <SnackMessages open={open} handleClose={handleClose} type={type} message={message} />
            
        </form>
    )
}

export default UserEditForm