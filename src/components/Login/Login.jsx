import LoginForm from "./LoginForm"
import logoPuche from '../../assets/img/Login/Puche1080.png'
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const history = useNavigate()
  const handleTableView = () => {
    //history("tabla")
    window.location.href = "tabla"
  }
  return (
    <>  
        <img src={logoPuche} alt="logo"/>
        <LoginForm />
        <Button onClick={handleTableView}>Ir a tabla</Button>
    </>
  )
}

export default Login