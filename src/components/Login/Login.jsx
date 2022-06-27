import LoginForm from "./LoginForm"
import logoPuche from '../../assets/img/Login/Puche1080.png'
import logoMetaescuela from '../../assets/img/Login/Logo_MetaEscuela.png'
import '../../assets/scss/login/login.scss'
import { useState } from "react"
import RegisterForm from "./RegisterForm"
import { Grid } from "@mui/material"
const Login = () => {
  const [changeView, setChangeView] = useState(true)
  const handleChangeView = () => setChangeView(!changeView)
  return (
    <>  
      <div className='contenedor-titulo'>
          <h1 className='app__title'>METAESCUELA</h1>
          <h4 className='app__subtitle'>Estudiar nunca ha sido tan barato</h4>
          <div className="barra-color-azul"> </div>
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <img className='logoPuche' src={logoPuche} alt="logo"/>
        </Grid>
        <Grid 
          sx={{backgroundColor: "#99E2D5"}}
          item 
          xs={12} 
          sm={12} 
          md={6}
        >
          <div className="forms_container">
            <div>
              <img style={{marginLeft: 10, marginTop: 10}} src={logoMetaescuela} alt="logoMetaescuela"/>
            </div>
            <div>
              {changeView 
                ? 
                <LoginForm/> : 
                <RegisterForm/>}
            </div>
            <div>
            <div className="forms__footer">
              <hr />
              <div className="forms__options">
                <span>
                  {changeView ? 
                    "¿No tienes una cuenta?":
                    "¿Ya tienes una cuenta?"}
                </span>
                <button 
                style={{ 
                  backgroundColor: changeView ? "#EA9696" : "#4399A5",
                  color: "#F4FBFA"
                }}
                  onClick={handleChangeView}
                >
                  {changeView ? "Registrate": "Ingresa"}
                </button>
              </div>
            </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* <div className="triangle" ></div>   */}
    </>
  )
}

export default Login