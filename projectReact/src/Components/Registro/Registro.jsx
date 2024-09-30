import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registro.css';

export function Registro() {
    const [formData, setFormData] = useState({
        documento: '',
        nombre: '',
        correo: '',
        clave: '',
        rol: ''
    });

    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí podrías hacer la lógica para agregar el nuevo usuario al JSON o enviarlo a un backend
        // Simulación de registro exitoso
        setSuccess(true);

        // Simulamos agregar al archivo JSON aquí (solo si no hay backend)
        // Aquí enviarías una petición a tu backend si fuera necesario

        // Después de un pequeño tiempo, redirigimos al login
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <section>
            <h1 className="texto-mensajes">REGISTRARSE</h1>
            <div className="container-div">
                <form onSubmit={handleSubmit}>
                    <input
                        className="inputs-registro"
                        type="text"
                        name="documento"
                        id="doc"
                        placeholder="Documento"
                        value={formData.documento}
                        onChange={handleChange}
                    />
                    <input
                        className="inputs-registro"
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        className="inputs-registro"
                        type="text"
                        name="correo"
                        id="correo"
                        placeholder="Correo electrónico"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    <input
                        className="inputs-registro"
                        type="password"
                        name="clave"
                        id="clave"
                        placeholder="Contraseña"
                        value={formData.clave}
                        onChange={handleChange}
                    />
                    <input
                        className="inputs-registro"
                        type="text"
                        name="rol"
                        id="rol"
                        placeholder="Rol"
                        value={formData.rol}
                        onChange={handleChange}
                    />
                    <button type="submit">Registrarse</button>
                </form>

                {success && <p>¡Registrado con éxito! ya puedes iniciar sesion</p>}
            </div>
        </section>
    );
}