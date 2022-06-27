
import '../../assets/scss/login/loginForm.scss'
import { useState } from 'react'
import useAuth from '../../customHooks/useAuth';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import UserController from '../../assets/controllers/UserController';
import SnackMessages from '../CommonUiComponents/SnackMessages';
import { useNavigate, useLocation } from "react-router-dom"
const LoginForm = () => {
  const { setAuth } = useAuth();
  //Varaibles para el mensaje de alerta
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const handleClose = () => setOpen(false);
  //Variables para el formulario
  const navigate =  useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const sendDataForLogin = async () => {
    try{
      let payload = {
        user_email:getValues("email"),
        user_password: getValues("password")
      }
      let dataUser  = await UserController.loginUser(payload);
      if(dataUser?.data?.user){
        let userData = {
          user_name : dataUser?.data.user.user_name,
          user_id: dataUser?.data.user.id,
          user_roles: dataUser?.data.user.user_roles,
          user_token: dataUser?.data.token
        }
        localStorage.setItem('user_name', JSON.stringify(userData.user_name));
        localStorage.setItem('user_token', JSON.stringify(userData.user_token));
        localStorage.setItem('user_id', userData.user_id)
        localStorage.setItem('user_roles', JSON.stringify(userData.user_roles));
        setAuth(userData)
        setMessage('Bienvenid@ ' + dataUser?.data.user.user_name);
        setType('success');
        setOpen(true);
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000)
      }else{
        console.log(dataUser)
        setMessage(dataUser?.response?.data?.message);
        setType('error');
        setOpen(true);
      }
    }catch(error){
        setMessage("Sin respuesta del servidor");
        setType('error');
        setOpen(true);
    }
  }
  return (
    <div className="form__container">  
      <h2 className="login__title">Login</h2>
        <form className="formulario" onSubmit={handleSubmit(sendDataForLogin)}>
          <div>
            
            <TextField
              name="email"
              {...register("email", { 
                required: { 
                  value: true,
                  message: "El correo es requerido"
                },
                pattern: { 
                  value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                  message: "Correo no válido"
                }
              })}
              sx={{
                backgroundColor: "#F4FBFA", 
                fontFamily:"Poppins, serif",
                minWidth: "400px",
                borderRadius: "5px",
              }}
              error={errors.email ? true : false}
              type="email" 
              label="Email"
              helperText={errors.email ? errors.email.message : ""}
              />
          </div>
          <div>
            
            <TextField
              name="password"
              {...register("password", {
                required: { 
                  value: true,
                  message: "La contraseña es requerida"
                },
                minLength: { 
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres"
                }
              })}
              sx={{
                backgroundColor: "#F4FBFA", 
                fontFamily:"Poppins, serif",
                minWidth: "400px",
                borderRadius: "5px",
              }}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
              type='password' 
              label="Contraseña"
              />
          </div>
          <button  
            type="submit"
            className="login__button"
          >
            Ingresar
          </button>
        </form>
        <SnackMessages 
          open={open}
          handleClose={handleClose}
          message={message}
          type={type}
        />
    </div>
  )
}

export default LoginForm