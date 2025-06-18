/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { MenuProductos } from "../../Views/MenuProductos/MenuProductos"
import { Header } from "../Header/Header";
import "./menu.css"

// eslint-disable-next-line react/prop-types
export function Menu({ user, setUser }) {
  const [ClickProducts, setClickProducts] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      {ClickProducts ? (
        <MenuProductos />
      ) : (
        <section className="container-father-menu">
        <Header user={user} setUser={setUser} />
          <section className="container-menu">
            <img className="menu-logo-main" src="../../../asset/Icono.PNG" alt="" />
            <h1 >MENU PRINCIPAL</h1>
            <div className="container-padre">
              
               <figure
                onClick={() => navigate('/products')}
                onKeyDown={(e) => handleKeyDown(e, '/products')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Productos"
                  src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                  alt="icono-productos"
                />
                <h2>PRODUCTOS</h2>
              </figure>


              <figure
                onClick={() => navigate('/clients')}
                onKeyDown={(e) => handleKeyDown(e, '/clients')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Clientes"
                  src="https://img.icons8.com/?size=100&id=2906&format=png&color=000000"
                  alt="icono-clientes"
                />
                <h2>CLIENTES</h2>
              </figure>

              <figure
                onClick={() => navigate('/suppliers')}
                onKeyDown={(e) => handleKeyDown(e, '/suppliers')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Proveedor"
                  src="https://img.icons8.com/?size=100&id=61849&format=png&color=000000"
                  alt="icono-Proveedor"
                />
                <h2>PROVEEDOR</h2>
              </figure>


              <figure
                onClick={() => navigate('/rawMaterials')}
                onKeyDown={(e) => handleKeyDown(e, '/rawMaterials')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Insumos"
                  src="https://img.icons8.com/?size=100&id=1326&format=png&color=000000"
                  alt="icono-insumos"
                />
                <h2>INSUMOS</h2>
              </figure>



              <figure
                onClick={() => navigate('/Inventory')}
                onKeyDown={(e) => handleKeyDown(e, '/Inventory')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Estadisticas"
                  src="https://img.icons8.com/?size=100&id=11496&format=png&color=000000"
                  alt="icono-estadisticas"
                />
                <h2>MOVIMIENTOS INVENTARIO</h2>
              </figure>



              <figure
                onClick={() => navigate('/Ventas')}
                onKeyDown={(e) => handleKeyDown(e, '/Ventas')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  className="Ventas"
                  src="https://img.icons8.com/?size=100&id=76961&format=png"
                  alt="icono-ventas"
                />
                <h2>VENTAS</h2>
              </figure>



             <figure
                onClick={() => navigate('/historical-prices')}
                onKeyDown={(e) => handleKeyDown(e, '/historical-prices')}
                tabIndex={0}
                role="button"
                className="container-hijo"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=7YM7E0FU20tN&format=png&color=000000"
                  alt="icono-historico-precios"
                />
                <h2>HISTÓRICO DE PRECIOS</h2>
              </figure>
              


            </div>
          </section>
        </section>
      )}
    </>
  );
}