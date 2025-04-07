import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InventoryMovementsPDF from "../../../asset/Reports/reportInventoryMovements/reportInventoryMovements.jsx";
import "./inventoryMovements.css"

export function InventoryMovements({ user, setUser }) {
  const [inventoryList, setInventoryList] = useState([]);

  const navigate = useNavigate()

  const getInventory = () => {
    Axios.get("http://localhost:3000/api/v1/inventory")
      .then((response) => {
        setInventoryList(response.data);
      })
  }

  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    } else {
      getInventory();
    }
  }, [user, navigate])

  return (

    <>
      <section className="container-father-services">
        <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
        <div className="container">
          <div className="cardmin">
            <button className="btn btn-edit" style={{ color: "white" }}>
              <PDFDownloadLink
                document={<InventoryMovementsPDF inventoryList={inventoryList} />}
                fileName="InventoryMovements.pdf"
              >
                {({ loading }) => (
                  loading ? "Cargando reporte..." : <span style={{ color: "black" }}>Descargar Reporte</span>
                )}
              </PDFDownloadLink>
            </button>
          </div>

          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tipo de Movimiento</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Fecha de movimiento</th>
                  <th scope="col">Motivo</th>
                  <th scope="col">Insumos</th>
                  <th scope="col">Producto</th>
                </tr>
              </thead>
              <tbody>
                {
                  inventoryList.map((val, key) => {
                    return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.tipo_movimiento}</td>
                      <td>{val.cantidad}</td>
                      <td>{val.fecha_movimiento}</td>
                      <td>{val.motivo}</td>
                      <td>{val.insumos_id}</td>
                      <td>{val.producto_id}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </section>


    </>

  )

}


