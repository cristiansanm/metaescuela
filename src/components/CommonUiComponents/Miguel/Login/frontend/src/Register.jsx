import React, { useState } from 'react'
import axios from "axios";
 
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [alumn, setConfAlumn] = useState('');
    const [Direccion, setDireccion] = useState('');

    const [msg, setMsg] = useState('');
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                telefono: telefono,
                Direccion: Direccion,
                alumn: alumn    
            });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Nombre</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Nombre"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="ejemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Contraseña</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirmar Contraseña</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Telefono</label>
                                    <div className="controls">
                                        <input type="number" className="input" placeholder="616253254" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Direccion</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="C/Falsa 123" value={Direccion} onChange={(e) => setDireccion(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Alumno en el instituto</label>
                                    <div className="controls">
                                        <form>
                                        <input type="radio" value={1} onChange={(e) => setConfAlumn(e.target.value)} checked />
                                        <label>Si</label><br/>
                                        </form>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Registrarme</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register