import { useEffect, useState } from "react";
import { ApiFetch } from "../../services/api";

import "./registro.css"

export function Registro ({ setIsRegister }){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ errorPass, setErrorPass ] = useState(false)
    const [ errorEmail, setErrorEmail ] = useState(false);
    const [ errorExistsEmail, setErrorExistsEmail ] = useState(false);

    const createUser = async (user) => {
        let string = '';
        try {
            await ApiFetch.create(user);
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

        if(!(email.length > 0) || !(password.length > 0)||!(repeatPassword.length > 0)) {
            setErrorEmail(true);
            return;
        }

        if(password !== repeatPassword) {
            setErrorEmail(false);
            setErrorPass(true);
            return;
        }

        const newUser = {
            email: email,
            password: password
        }

        try{
            createUser(newUser);
        }catch(err) {
            console.log(err);
        }
    }

    return(
        <section>
            <form onSubmit={handleRegister}>

            <h1 className="texto-mensajes">REGISTRARSE</h1>
            <div className="container-div">
                <input 
                    className="inputs-registro" 
                    type="text" 
                    name="usuario" 
                    id="correo"  
                    placeholder="Correo electronico" autoComplete="current-email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    className="inputs-registro" 
                    type="password"
                    name="password" 
                    id="password" 
                    placeholder="Contraseña" autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)} 
                />
                <input 
                    className="inputs-registro" 
                    type="repeatPassword"
                    name="repeatPassword" 
                    id="repeatPassword" 
                    placeholder="repita Contraseña" autoComplete="current-password"
                    onChange={e => setRepeatPassword(e.target.value)}
                />
                {errorPass && <p>Las contraseña deben coincidir.</p>}
                {errorEmail && <p>No pueden estar espacios vacio y debe tener un formato de correo.</p>}
                {errorExistsEmail && <p>El correo esta vinculado a una cuenta existente</p>}
                <button >Registrarse</button>
            </div>
            </form>
        </section>
    )
} 