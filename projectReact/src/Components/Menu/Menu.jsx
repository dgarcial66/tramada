import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { MenuProductos } from "../../Views/MenuProductos/MenuProductos"
import { Header } from "../Header/Header";
import "./menu.css"


export function Menu({ setUser }) {
  const [ClickProducts, setClickProducts] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      {ClickProducts ? (
        <MenuProductos />
      ) : (
        <section className="container-father-menu">
          <Header setUser={setUser} />
          <section className="container-menu">
            <img className="menu-logo-main" src="../../../asset/Icono.PNG" alt="" />
            <h1 >MENU PRINCIPAL</h1>
            <div className="container-padre">
              <figure onClick={() => navigate('/products')} className="container-hijo">
                <img                
                  className="Productos"
                  src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
                  alt="icono-productos"
                />
                <h2>PRODUCTOS</h2>
              </figure>
              <figure onClick={() => navigate('/clients')} className="container-hijo">
                <img
                  className="Clientes"
                  src="https://img.icons8.com/?size=100&id=2906&format=png&color=000000"
                  alt="icono-clientes"
                />
                <h2>CLIENTES</h2>
              </figure>

              <figure onClick={() => navigate('/suppliers')} className="container-hijo">
                <img                 
                  className="Proveedor"
                  src="https://img.icons8.com/?size=100&id=61849&format=png&color=000000"
                  alt="icono-Proveedor"
                />
                <h2>PROVEEDOR</h2>
              </figure>
              <figure onClick={() => navigate('/rawMaterials')} className="container-hijo">
                <img                 
                  className="Insumos"
                  src="https://img.icons8.com/?size=100&id=1326&format=png&color=000000"
                  alt="icono-insumos"
                />
                <h2>INSUMOS</h2>
              </figure>

              <figure onClick={() => navigate('/Inventory')} className="container-hijo">
                <img                 
                  className="Estadisticas"
                  src="https://img.icons8.com/?size=100&id=11496&format=png&color=000000"
                  alt="icono-estadisticas"
                />
                <h2>MOVIMIENTOS INVENTARIO</h2>
              </figure>

              <figure onClick={() => navigate('/Ventas')} className="container-hijo">
                <img                 
                  className="Ventas"
                  src="https://img.icons8.com/?size=100&id=76961&format=png"
                  alt="icono-ventas"
                />
                <h2>VENTAS</h2>
              </figure>

              <figure onClick={() => navigate('/historical-prices')} className="container-hijo">
                <img                 
                  src="https://img.icons8.com/?size=100&id=7YM7E0FU20tN&format=png&color=000000"
                  alt="icono-historico-precios"
                />
                <h2>HISTÓRICO DE PRECIOS</h2>
              </figure>

              <figure onClick={() => navigate('/Config')} className="container-hijo">
                <img                 
                  className="Configuración"
                  src="https://img.icons8.com/?size=100&id=11360&format=png&color=000000"
                  alt="icono-configuracion"
                />
                <h2>CONFIGURACION</h2>
              </figure>


            </div>
          </section>
        </section>
      )}
    </>
  );
}