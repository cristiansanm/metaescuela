import {useEffect, useState} from 'react'
import logMeta from "../../assets/img/Login/Logo_MetaEscuela.png"
import "../../assets/scss/CommonUI/LoadingLogo.scss"
import sad from "../../assets/img/Icons/sad.png"
const ShowLoading = () =>{
    return (
        <div className="img__logo">
        <img src={logMeta} alt="" />
    </div>
    )
}
const ShowMessage = () =>{
    return(
        <div
            style={{
                display:"flex", 
                alignItems: "center",
                color: "#283845",
                justifyContent: "center",
                width: "100%",
                gap: 30
            }}
        >
            <h2>No hay data para mostar... </h2>
            <img className="sad__face__animation" src={sad} alt="sadface" />
        </div>
    )
}
const LoadingLogo = () => {
  const [time, setTime] = useState(false);
  const setTimer = () => {
      setTimeout(()=> {
        setTime(true)
      }, 4000)
  }
  useEffect(()=>{
    setTimer()
  }, [])
    return time ?  <ShowMessage/> : <ShowLoading/> 
    
    
}

export default LoadingLogo