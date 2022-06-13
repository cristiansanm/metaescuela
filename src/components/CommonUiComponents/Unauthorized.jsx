import { useNavigate } from 'react-router-dom'
const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>No tienes permiso parar entrar aquí</div>
            <button onClick={()=>navigate(-1)}>Regresar</button>
        </>

    )
}

export default Unauthorized