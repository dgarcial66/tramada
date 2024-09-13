import "./menu.css"

export function Menu (){

    return(
        <>
                <header class="iconos-menu">
        <section class="logo-menu">
            <figure>
                <img src="../assets/Iconoemp.png" alt="logo de empresa"/>
            </figure>
        </section>
        <section class="perfil-menu">
            <img src="/assets/usuario.png" alt="logo de empresa"/>
        </section>
    </header>
        <section>
            <h1>MENU PRINCIPAL</h1>
            <div className="container-padre">
                <div className="container-hijo"> 
            <img class="Productos" src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                        alt="icono-productos"/>
                <h2>PRODUCTOS</h2>
                </div>
                <div className="container-hijo">
                <img class="Clientes" src="https://img.icons8.com/?size=100&id=2906&format=png&color=000000"
                    alt="icono-clientes"/>
                <h2>CLIENTES</h2>
                </div>
                <div className="container-hijo">
                <img class="Proveedor" src="https://img.icons8.com/?size=100&id=61849&format=png&color=000000"
                        alt="icono-Proveedor"/>
                <h2>PROVEEDOR</h2>
                </div>
                <div className="container-hijo">
                <img class="Insumos" src="https://img.icons8.com/?size=100&id=1326&format=png&color=000000"
                        alt="icono-insumos"/>
                <h2>INSUMOS</h2>
                </div>
                <div className="container-hijo">
                <img class="Estadisticas" src="https://img.icons8.com/?size=100&id=11496&format=png&color=000000"
                        alt="icono-estadisticas"/>
                <h2>ESTADISTICAS</h2>
                </div>
                <div className="container-hijo">
                <img class="Configuración" src="https://img.icons8.com/?size=100&id=11360&format=png&color=000000"
                        alt="icono-configuracion"></img>
                <h2>CONFIGURACION</h2>
                </div>
                </div>
        </section>
        </>
    )



}