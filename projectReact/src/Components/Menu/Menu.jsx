import { useState } from "react"
import { useNavigate }  from 'react-router-dom'
import { MenuProductos } from "../../Views/MenuProductos/MenuProductos"
import { Header } from "../Header/Header";
import "./menu.css"


export function Menu ({ setUser }){
    const [ClickProducts, setClickProducts] = useState(false);
    const navigate = useNavigate()
    return(
        <>
        {ClickProducts ? (
          <MenuProductos /> // Si se hace clic en Productos, renderiza el componente MenuProductos
        ) : (
          <>
          <Header setUser={setUser} />
            <section>
              <h1 className="titulo">MENU PRINCIPAL</h1>
              <div className="container-padre">
                <figure className="container-hijo">
                  <img
                    onClick={() => navigate('/products')} // Al hacer clic, cambia el estado
                    className="Productos"
                    src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                    alt="icono-productos"
                  />
                  <h2>PRODUCTOS</h2>
                </figure>
                <figure className="container-hijo">
                  <img
                  onClick={() => navigate('/clients')}
                    className="Clientes"
                    src="https://img.icons8.com/?size=100&id=2906&format=png&color=000000"
                    alt="icono-clientes"
                  />
                  <h2>CLIENTES</h2>
                </figure>
                <figure className="container-hijo">
                  <img
                    className="Proveedor"
                    src="https://img.icons8.com/?size=100&id=61849&format=png&color=000000"
                    alt="icono-Proveedor"
                  />
                  <h2>PROVEEDOR</h2>
                </figure>
                <figure className="container-hijo">
                  <img
                    className="Insumos"
                    src="https://img.icons8.com/?size=100&id=1326&format=png&color=000000"
                    alt="icono-insumos"
                  />
                  <h2>INSUMOS</h2>
                </figure>
                <figure className="container-hijo">
                  <img
                    className="Estadisticas"
                    src="https://img.icons8.com/?size=100&id=11496&format=png&color=000000"
                    alt="icono-estadisticas"
                  />
                  <h2>ESTADISTICAS</h2>
                </figure>
                <figure className="container-hijo">
                  <img
                    className="Configuración"
                    src="https://img.icons8.com/?size=100&id=11360&format=png&color=000000"
                    alt="icono-configuracion"
                  />
                  <h2>CONFIGURACION</h2>
                </figure>
              </div>
            </section>
          </>
        )}
      </>
    );
  }