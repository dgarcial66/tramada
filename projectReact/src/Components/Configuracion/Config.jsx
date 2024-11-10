import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../Header/Header";
import './config.css'

export function Config({ user, setUser }) {
    const [activeForm, setActiveForm] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        password: user.password,
        role: user.role
    });
    const navigate = useNavigate();

    const handleForm = () => {
        setActiveForm(!activeForm);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        setUser({
            ...user,
            ...formData
        });

       
        alert('Usuario actualizado con éxito');
        navigate('/home');
    };

    return (
        <>
            <Header setUser={setUser} />
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
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"  
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="role">Rol</label>
                        <input 
                            type="text" 
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </section>
            }
        </>
    );
}