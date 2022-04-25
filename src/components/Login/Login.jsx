import LoginForm from "./LoginForm"
import logoPuche from '../../assets/img/Login/Puche1080.png'
import logoMetaescuela from '../../assets/img/Login/Logo_MetaEscuela.png'
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import '../../assets/scss/login/login.scss'
const Login = () => {
  const history = useNavigate()
  const handleTableView = () => {
    history("/tabla")
    //window.location.href = "tabla"
  }
  const carrito = localStorage.setItem("carrito", "me llamo carrito");

  return (
    <>  
      <div className='contenedor-titulo'>
          <h1>METAESCUELA</h1>
          <h4>Estudiar nunca ha sido tan barato</h4>
          <div className="barra-color-azul"> </div>
      </div>
      <div className="contenedor-formulario-foto">
        <img className="logoPuche" src={logoPuche} alt="logo"/>
        <div className="contenedor-foumulario" >
            <img className="logoMetaescuela" src={logoMetaescuela} alt="logoMetaescuela" />
            <LoginForm />
        </div>
        
      </div>  

        <Button onClick={handleTableView}>Ir a tabla</Button>
        <Button onClick={()=> history("/productos")}>Ir a productos</Button>
        {console.log(localStorage.getItem("carrito"))}
    </>
  )
}

export default Login