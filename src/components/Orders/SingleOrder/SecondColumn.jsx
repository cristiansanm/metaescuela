import woman from "../../../assets/img/Icons/mujer.png"
import bagImg from "../../../assets/img/Icons/mejor-vendido.png"
import verifyIcon from "../../../assets/img/Icons/verificar.png"
import { useNavigate } from "react-router-dom"
const SecondColumn = () => {
    const navigate = useNavigate()
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: "20px",
                margin: "30% 0",
                color: "#283845"
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <div>
                    <img src={bagImg} alt="bag" width="150" />
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: "10px",
                        fontSize: "15px",
                        fontWeight: "500",
                    }}
                >
                    <span>Compra verificada</span> <img src={verifyIcon} alt="" width="24" />
                </div>
            </div>
            <hr
                style={{
                    border: "1px solid #283845",
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: "20px"
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: "500"
                    }}
                >
                    <span>¿Necesitas más?</span>
                    <img src={woman} alt="woman" width="48" />
                </div>
                <div>
                    <button
                        className="button__products__send"
                        onClick={()=> navigate("/products")}
                    >
                        Ir a productos
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SecondColumn