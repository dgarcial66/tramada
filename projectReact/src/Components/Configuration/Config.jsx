import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../Header/Header";
import './config.css'


export function Config({ user, setUser }) {
    const [activeForm, setActiveForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.email.length === 0) {
            navigate('/');
        }
    }, [])

    const handleForm = () => {
        setActiveForm(!activeForm);
    }

    return (
        <>
            <section className='container-father-services'>
                <Header setUser={setUser} />
                <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
                <div className='container'>
                    <section className="container-config">
                        <h1 style={{color:'white'}}>Configuración</h1>

                        <div className="content-list-config">
                            <span className='input-label' style={{color:'white'}}>Modificar datos del usuario</span>
                            <button onClick={handleForm} className='btn btn-update'>Cuenta</button>
                        </div>
                    </section>
                    {
                        activeForm &&
                        <div className='card'>
                            <div className='card-header'>
                                <h2>Edita el usuario {user.name}</h2>
                            </div>

                            <form action="submit" className='card-body'>
                                <div className='input-group'>
                                    <label htmlFor="name" className='input-label'>Nombre</label>
                                    <input type="text" defaultValue={user.name} className='input-field' placeholder='Nombre usuario' />
                                    <label htmlFor="password" className='input-label'>Contraseña</label>
                                    <input type="text" defaultValue={user.password} className='input-field' placeholder='Contraseña' />
                                    <label htmlFor="rol" className='input-label'>Rol</label>
                                    <input type="text" defaultValue={user.role} className='input-field' placeholder='Rol usuario' />
                                    <button className='btn btn-register'>Confirmar</button>

                                </div>

                            </form>

                        </div>
                    }

                </div>

            </section>

        </>
    )

}