import "./registro.css"

export function Registro (){

    return(
        <section>
            <h1 className="texto-mensajes">REGISTRARSE</h1>
            <div className="container-div">
                <input className="inputs-registro" type="text" name="documento" id="doc" placeholder="Documento" />
                <input className="inputs-registro" type="text" name="nombre" id="nombre" placeholder="Nombre" />
                <input className="inputs-registro" type="text" name="usuario" id="correo" placeholder="Correo electronico"/>
                <input className="inputs-registro" type="password" name="clave" id="clave" placeholder="Contraseña"/>
                <input className="inputs-registro" type="text" name="rol" id="rol" placeholder="Rol" />
                <button>Registrarse</button>
            </div>
        </section>
    )
} 