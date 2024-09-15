import "./menu.css"
import { MenuProductos } from "../../Views/MenuProductos/MenuProductos"
import { useState } from "react"


export function Menu ( ){
    const [ClickProducts, setClickProducts] = useState(false);

    return(
        <>
        {ClickProducts ? (
          <MenuProductos /> // Si se hace clic en Productos, renderiza el componente MenuProductos
        ) : (
          <div>
            <header className="iconos-menu">
              <section className="logo-menu">
                <figure>
                  <img src="../assets/Iconoemp.png" alt="logo de empresa" />
                </figure>
              </section>
              <section className="perfil-menu">
                <img src="/assets/usuario.png" alt="logo de empresa" />
              </section>
            </header>
            <section>
              <h1 className="titulo">MENU PRINCIPAL</h1>
              <div className="container-padre">
                <div className="container-hijo">
                  <img
                    onClick={() => setClickProducts(true)} // Al hacer clic, cambia el estado
                    className="Productos"
                    src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                    alt="icono-productos"
                  />
                  <h2>PRODUCTOS</h2>
                </div>
                <div className="container-hijo">
                  <img
                    className="Clientes"
                    src="https://img.icons8.com/?size=100&id=2906&format=png&color=000000"
                    alt="icono-clientes"
                  />
                  <h2>CLIENTES</h2>
                </div>
                <div className="container-hijo">
                  <img
                    className="Proveedor"
                    src="https://img.icons8.com/?size=100&id=61849&format=png&color=000000"
                    alt="icono-Proveedor"
                  />
                  <h2>PROVEEDOR</h2>
                </div>
                <div className="container-hijo">
                  <img
                    className="Insumos"
                    src="https://img.icons8.com/?size=100&id=1326&format=png&color=000000"
                    alt="icono-insumos"
                  />
                  <h2>INSUMOS</h2>
                </div>
                <div className="container-hijo">
                  <img
                    className="Estadisticas"
                    src="https://img.icons8.com/?size=100&id=11496&format=png&color=000000"
                    alt="icono-estadisticas"
                  />
                  <h2>ESTADISTICAS</h2>
                </div>
                <div className="container-hijo">
                  <img
                    className="Configuración"
                    src="https://img.icons8.com/?size=100&id=11360&format=png&color=000000"
                    alt="icono-configuracion"
                  />
                  <h2>CONFIGURACION</h2>
                </div>
              </div>
            </section>
          </div>
        )}
      </>
    );
  }