import '../../../../styles/styles.css'
import { useEffect, useState } from "react"
import { ApiFetch } from "../../services/api.js"
import "./login.css"

export function Login({ setUser, setIsRegister }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(undefined);
    const [error, setError] = useState(false)
    const [errorUser, setErrorUser] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        async function getInfo() {
            const infoUser = await ApiFetch.isLogin();
            console.log("SOY USER EN USEFFECT: ", infoUser);
            console.log("SOY USER EN USEFFECT STATUS: ", infoUser.status);
            if (infoUser.status !== 200) {
                console.log("USUARIO NO EXISTE: ");
                return;
            }
            setUser(infoUser.data);
        }
        getInfo();
    }, [])

    const userAuth = async (body) => {
        let string = '';
        try {
            const info = await ApiFetch.authUser(body)
            setToken(info.token);
            setUser(info.data)
            console.log(info);
        } catch (error) {
            console.log(error);
            string = error.message.split('com').pop().trim();
            console.log('AQUI PASA:', string);
            console.log(string === 'no esta registrado.');
            if (error.message === '400') {
                console.log('DOBLE B');
                setErrorUser(false);
                setError(true);
                setErrorPassword(false);
            } else if (string === ' no esta registrado.') {
                setErrorUser(false);
                setError(false)
                setErrorPassword(true);
                string = '';
            } else {
                console.log('DOBLE P');
                setErrorUser(true);
                setError(false);
                setErrorPassword(false);
            }

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        }
        console.log("AQUI TENEMOS DATA: ", data);
        userAuth(data);

    }
    return (
        <section className="padre-formulario">
            <section>
                <form className="formulario" onSubmit={handleSubmit}>
                    <h1>Ingrese su usuario</h1>

                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                        autoComplete="current-email"
                    />
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        autoComplete="current-password"
                    />
                    <button>Iniciar sesión</button>
                    <button
                        onClick={() => {
                            setIsRegister(true)
                        }
                        }
                    >Registrarse</button>
                    {errorUser && <p>El usuario no existe o la contraseña no es correcta!!</p>}
                    {errorPassword && <p>La contraseña no es correcta.</p>}
                    {error && <p>Todos los campos son obligatorios</p>}
                </form>

            </section>
        </section>

    )
}
