// import { TextField } from '@mui/material'
import '../../assets/scss/login/loginForm.scss'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import UserController from '../../assets/controllers/UserController';
import SnackMessages from '../CommonUiComponents/SnackMessages';
const LoginForm = () => {
  //Varaibles para el mensaje de alerta
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const handleClose = () => setOpen(false);

  const navigate =  useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendDataForLogin = async () => {
    try{
      let payload = {
        user_email:email,
        user_password: password
      }
      let { data } = await UserController.loginUser(payload);
      if(data.user){
        localStorage.setItem('user', JSON.stringify(data.token));
        localStorage.setItem('id', data.user.id)
        setMessage('Bienvenid@ ' + data.user.user_name);
        setType('success');
        setOpen(true);
        setTimeout(() => {
          navigate('/products')
        }, 1000)
      }else{
        setMessage(data.message);
        setType('error');
        setOpen(true);
      }
    }catch(error){
      setMessage("Usario o contraseña incorrectos");
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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