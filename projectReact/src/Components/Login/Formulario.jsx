import "./formulario.css"
import { useState } from "react"

export function Formulario({ setUser }){
    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(nombre == "" || contraseña == "" ){
         setError(true)
         return   
        }
        setError(false)

        setUser([nombre])

    }
    
    return(
        <section>
            

                <form className="formulario"
                onSubmit={handleSubmit}
            >
                <h1>ingrese su usuario</h1>

                <input type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="nombre de usuario"
                />
                <input type="password"
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}
                placeholder="ingrese su contraseña"
                />
                <button>iniciar sesion</button>
                <button>registrarse</button>
                {error && <p>todos los campos son obligatorios</p>}
            </form>
            
        </section>
    )
  }