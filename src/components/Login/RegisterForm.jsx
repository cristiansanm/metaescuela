import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'
import "../../assets/scss/login/RegisterForm.scss"
import { textFieldBg } from '../../assets/js/styleObject/Login/TextFieldStyle'
import {gradesArray} from "../../assets/js/formaters.js";
import { useForm } from "react-hook-form";
import SnackMessages from '../CommonUiComponents/SnackMessages';
import UserController from '../../assets/controllers/UserController';
const RegisterForm = ({view}) => {
  //Varaibles para el snack
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const handleClose = () => setOpen(false);
  
  const [grade, setGrade] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const handleChangeGrade = (e) => setGrade(e.target.value)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sendDataForRegister = async () => {
    let payload = {
      user_name: name,
      user_lastname: lastName,
      user_email: email,
      user_password: password,
      user_phone: phone,
      user_grade: grade,
      user_is_buyer: true,
      user_is_seller: false,
      user_profile_image: ""
    }
    try{
      let { data } = await UserController.registerUser(payload);
      if(data.user){
        setMessage(data.message);
        setType('success');
        setOpen(true);

        setName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhone("")
        setGrade("")

      }else{
        setOpen(true);
        setMessage(data.message);
        setType('error');
      }
    }catch(error){
      setOpen(true);
      setMessage(error.message);
      setType('error');
    }
  }
  return (
      <form className="register__form__container" onSubmit={handleSubmit(sendDataForRegister)}>
          <h2 className="login__title">Regístrate</h2>
          <div className="shared__field">
            <TextField
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                }, 
                pattern:{ 
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
                required: {
                  value: true,
                  message: "El apellido es requerido",  
                },
                pattern:{
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
                required: {
                  value: true,
                  message: "El teléfono es requerido",
                },
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
                required: {
                  value: true,
                  message: "El email es requerido",
                }
              })}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
              sx={textFieldBg}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              name='password'
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                }
              })}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
              sx={textFieldBg} 
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              name='confirmPassword'
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Tienes que confirmar tu contraseña",
                },
                validate: value => 
                  value === password || "Las contraseñas no coinciden"
              })}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
              sx={textFieldBg}
              label="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <div style={{display:"flex", justifyContent: "center" }}>
            <button type="submit" 
              className="register__button"
            >
              Registrarse
            </button>
          </div>
          <SnackMessages
            open={open}
            handleClose={handleClose}
            message={message}
            type={type}
          />
      </form>
  )
}

export default RegisterForm