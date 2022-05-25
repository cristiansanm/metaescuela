// import { TextField } from '@mui/material'
import '../../assets/scss/login/loginForm.scss'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const history =  useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()) {
      console.log('ingrese email')
      return
    }
    if(!password.trim()) {
      console.log('ingrese contraseña')
      return
    }
    console.log("ha entrado")
  }


  return (
    <>  
      <h2 className="login__title">Login</h2>
        <form className="formulario" onSubmit={procesarDatos}>
          <div>
            
            <input 
              type="email" 
              className="email" 
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
          </div>
          <div>
            
            <input 
              type='password' 
              className="password" 
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
          </div>
          <button 
            onClick={() => history("/products")} 
            type="submit"
            className="login__button"
          >
            Ingresar
          </button>
        </form>
        {/*
        <TextField className="email"
            placeholder='email'    
        />
        <TextField className='password'
            placeholder='password'
        />
        
        <button type="submit" >Login</button> */}
    </>
  )
}

export default LoginForm