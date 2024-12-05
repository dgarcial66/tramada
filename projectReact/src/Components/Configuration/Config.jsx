import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../Header/Header";
import './config.css'


export function Config({ user, setUser}){
    const [ activeForm, setActiveForm ] = useState(false);
    const navigate = useNavigate();

    const handleForm = () => {
        setActiveForm(!activeForm);
    }

    return(
        <>
            <Header setUser={setUser}/>
            <button className="button-back" onClick={() => navigate('/home')} />
            <section className="container-config">
                <h1>Configuración</h1>

                <div className="content-list-config">
                    <span>Modificar datos del usuario</span>
                    <button onClick={handleForm}>Cuenta</button>
                </div>
            </section>
            {
                activeForm && 
                <section className='container-form-config'>
                    <h2>Edita el usuario {user.name}</h2>
                    <form action="submit">
                        <label htmlFor="name">Nombre</label>
                        <input type="text"  defaultValue={user.name}/>
                        <label htmlFor="password">Contraseña</label>
                        <input type="text" defaultValue={user.password}/>
                        <label htmlFor="rol">Rol</label>
                        <input type="text" defaultValue={user.role}/>
                            <button>Confirmar</button>
                    </form>
            </section>
            }
        </>
    )

}