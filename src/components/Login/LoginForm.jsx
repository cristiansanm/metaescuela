// import { TextField } from '@mui/material'
import '../../assets/scss/login/loginForm.scss'
import React from 'react'

const LoginForm = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
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
      <h2>Login</h2>
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
          <button type="submit">Ingresar</button>
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