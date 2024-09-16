import "./login.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login({ setUser, setIsRegister }){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorUser, setErrorUser] = useState(false)
    const [userActive, setUserActive ] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetch('../../../database/database.json')
        .then( res => res.json())
        .then( data => setUserActive(data.users))
    }, [])
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const userLogin =  userActive.filter(users => (users.name === name && users.password === password))
        if(name === "" || password === "" ){
            setError(true)
            return
        }else if(userLogin.length !== 0){
            const infoUser = userLogin[0]
            
            setError(false)
            setUser({
                ...infoUser
            })
            navigate('/home')
        }else{
            setErrorUser(true)
            return
        }
    }
    return(
        <section>
            <form className="formulario"
            onSubmit={handleSubmit}
            >
                <h1>ingrese su usuario</h1>
            
                <input type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="nombre de usuario"
                autoComplete="current-name"
                />
                <input type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="ingrese su contraseña"
                autoComplete="current-password"
                />
                <button>iniciar sesion</button>
                {errorUser && <p>El usuario no existe!!</p>}
                <button 
                    onClick={() => {
                            setIsRegister(true)
                        }
                    }
                >registrarse</button>
                {error && <p>todos los campos son obligatorios</p>}
            </form>

        </section>
    )
}
