import { useState } from "react";
import { ApiFetch } from "../../services/api";


// eslint-disable-next-line react/prop-types
export function Registration ({ setIsRegister }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ errorPass, setErrorPass ] = useState(false)
    const [ errorEmail, setErrorEmail ] = useState(false);
    const [ errorExistsEmail, setErrorExistsEmail ] = useState(false);

    const apiFetch = new ApiFetch();

    const createUser = async (user) => {
        let string = '';
        try {
            await apiFetch.create(user);
            setIsRegister(true);
            setErrorExistsEmail(false);
        }catch (err) {
            string = err.message.split(':').pop().trim();
            if(string === '409') {
                setErrorExistsEmail(true);
            }
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
    
        // Limpiar errores antes de validar
        setErrorEmail(false);
        setErrorPass(false);
        setErrorExistsEmail(false);
    
        if (!(email.trim()) || !(password.trim()) || !(repeatPassword.trim())) {
            setErrorEmail(true);
            return;
        }
    
        if (password !== repeatPassword) {
            setErrorPass(true);
            return;
        }
    
        const newUser = { email, password };
    
        try {
            createUser(newUser);
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <section className="padre-formulario">
            <form className="formulario form-register"
            onSubmit={handleRegister}
            >
                <img 
                    className="arrow"
                    src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" 
                    alt="arrow left"
                    onClick={() => setIsRegister(false)}
                />
                <h1>REGISTRARSE</h1>
            
                <input 
                    type="text"
                    value={email}
                    autoComplete="current-email"
                    name="usuario" 
                    id="correo"  
                    placeholder="Correo electronico"
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    name="password" 
                    id="password" 
                    placeholder="Contraseña"
                    onChange={e => setPassword(e.target.value)}
                />
                <input  
                    type="Password"
                    value={repeatPassword}
                    name="repeatPassword" 
                    id="repeatPassword" 
                    placeholder="Repita contraseña" autoComplete="current-password"
                    onChange={e => setRepeatPassword(e.target.value)}
                />
                <button>Registrarse</button>
                {errorPass && <p>Las contraseña deben coincidir.</p>}
                {errorEmail && <p>No pueden estar espacios vacio y debe tener un formato de correo.</p>}
                {errorExistsEmail && <p>El correo esta vinculado a una cuenta existente</p>}
            </form>
        </section>
        
    )
} 