import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import { textFieldBg } from '../../assets/js/styleObject/Login/TextFieldStyle';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import SnackMessages from '../CommonUiComponents/SnackMessages';
import { gradesArray } from '../../assets/js/formaters';
import UserController from '../../assets/controllers/UserController';
import useAuth from '../../customHooks/useAuth'
const UserEditForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const handleClose = () => setOpen(false);
    const { auth } = useAuth();
    const [grade, setGrade] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const handleChangeGrade = (e) => setGrade(e.target.value)
    
    const sendDataForEdit = async() =>{
        let payload = {
            user_name:name,
            user_lastname:lastName,
            user_grade:grade,
            user_email:email,
            user_phone:phone,
            userId:auth?.user_id
        }
        UserController.editUser(payload)
        .then(res => {
            setOpen(true)
            setMessage(res.data.message)
            setType("success")

        }).catch(error=>{
            setOpen(true)
            setMessage("Error al editar el usuario")
            setType("error")
        })
    }

    useEffect(() => {
        
        UserController.getOneUser({userId:auth?.user_id})
        .then(_user => {
            console.log(_user)
            let {data} = _user
            setName(data.user?.user_name)
            setLastName(data.user?.user_lastname)
            setGrade(data.user?.user_grade)
            setPhone(data.user?.user_phone)
            setEmail(data.user?.user_email) 

        })
        .catch(error => {
            console.log(error)
        })        
      }, []);
      return (
        <form onSubmit={handleSubmit(sendDataForEdit)}>
            <div className="shared__field">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="shared__field">
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
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
            </div>
            <TextField
                name="email"
                {...register("email", {
                    
                })}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
                sx={textFieldBg}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <SnackMessages open={open} handleClose={handleClose} type={type} message={message}/> 
            <button id="editprofile" type="submit">Actualizar</button>

        </form>
    )
}

export default UserEditForm