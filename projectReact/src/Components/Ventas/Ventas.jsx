import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Axios from "axios";

export function Ventas({ setUser, user }) {
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoV, setTipoV] = useState("");
  const [totalV, setTotalV] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [client, setClient] = useState("");
  const [ventalist, setVentalist] = useState([]);
  const [editar, setEditar] = useState(false);


  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [productoid, setProductoid] = useState("");

  const navigate = useNavigate();

  const clean = () => {
    setFecha("");
    setEstado("");
    setTipoV("");
    setTotalV("");
    setComentarios("");
    setClient("");
    setEditar(false);
  };

  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/');
    } else {
      getSales();
    }
  }, [user, navigate]);

  const getSales = () => {
    Axios.get("http://localhost:3000/api/v1/sales").then((response) => {
      setVentalist(response.data);
    });
  };

  const addSale = () => {
    if (!fecha || !estado || !tipoV || !totalV || !client) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos antes de registrar.",
      });
      return;
    }
    Axios.post("http://localhost:3000/api/v1/sales", {
      fecha_venta: fecha,
      estado_pago: estado,
      tipo_venta: tipoV,
      total_venta: totalV,
      comentarios: comentarios,
      clientes_id: client,
    })
      .then(() => {
        getSales();
        clean();
        Swal.fire({
          icon: "success",
          title: "Venta registrada",
          text: "La venta ha sido registrada correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al registrar venta:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al registrar la venta. Inténtalo de nuevo.",
        });
      });
  };

  const editSale = (val) => {
    setEditar(true);

    setFecha(val.fecha_actualizacion);
    setEstado(val.estado_pago);
    setTipoV(val.tipo_venta);
    setTotalV(val.total_venta);
    setComentarios(val.comentarios);
    setClient(val.clientes_id);
  };

  const updateSales = () => {
    Axios.put("http://localhost:3000/api/v1/sales", {
      id: id,
      fecha_venta: fecha,
      estado_pago: estado,
      tipo_venta: tipoV,
      total_venta: totalV,
      comentarios: comentarios,
      clientes_id: client,
    })
      .then(() => {
        getSales();
        clean();
        Swal.fire({
          icon: "success",
          title: "Venta actualizada",
          text: "La venta ha sido actualizada correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al actualizar venta:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al actualizar la venta. Inténtalo de nuevo.",
        });
      });
  };

  const openDetailModal = (sale) => {
    setSelectedSale(sale);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedSale(null);
  };

  const saveDetail = () => {
    if (!cantidad || !precio || !subtotal || !productoid) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, llena el detalle antes de guardar.",
      });
      return;
    }
    Axios.post("http://localhost:3000/api/v1/detail-sales", {
      cantidad: cantidad,
      precio_unitario: precio,
      subtotal: subtotal,
      ventas_id: selectedSale.id,
      productos_id: productoid,
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Detalle guardado",
          text: "El detalle se ha guardado correctamente.",
        });
        closeDetailModal();
      })
      .catch((error) => {
        console.error("Error al guardar detalle:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al guardar el detalle.",
        });
      });
  };


  return (
    <>
      <section className="container-father-services">
        <Header setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />

        <div className="container">
          <div className="card">
            <div className="card-header">
              GESTION VENTAS
            </div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Fecha venta </span>
                <input type="datetime-local" value={fecha}
                  onChange={(event) => {
                    setFecha(event.target.value)
                  }} className="input-field" placeholder="Fecha venta" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Estado de pago </span>
                <input type="text" value={estado}
                  onChange={(event) => {
                    setEstado(event.target.value)
                  }} className="input-field" placeholder="Estado de pago" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Tipo de venta </span>
                <input type="text" value={tipoV}
                  onChange={(event) => {
                    setTipoV(event.target.value)
                  }} className="input-field" placeholder="Tipo de venta" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Total venta </span>
                <input type="number" value={totalV}
                  onChange={(event) => {
                    setTotalV(event.target.value)
                  }} className="input-field" placeholder="Total venta" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Comentarios</span>
                <input type="text" value={comentarios}
                  onChange={(event) => {
                    setComentarios(event.target.value)
                  }} className="input-field" placeholder="Comentarios" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Codigo cliente</span>
                <input type="number" value={client}
                  onChange={(event) => {
                    setClient(event.target.value)
                  }} className="input-field" placeholder="Codigo cliente" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="card-footer">
              {
                editar ?
                  <div>
                    <button className="btn btn-update" onClick={updateSales}>Actualizar</button>
                    <button className="btn btn-cancel" onClick={clean}>Cancelar</button>
                  </div>
                  : <button className="btn btn-register" onClick={addSale}>Registrar</button>
              }
            </div>
          </div>
          
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fecha venta</th>
                  <th scope="col">Estado pago</th>
                  <th scope="col">Tipo venta</th>
                  <th scope="col">Total Venta</th>
                  <th scope="col">Comentarios</th>
                  <th scope="col">Codigo cliente</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  ventalist.map((val, key) => {
                    return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.fecha_venta}</td>
                      <td>{val.estado_pago}</td>
                      <td>{val.tipo_venta}</td>
                      <td>{val.total_venta}</td>
                      <td>{val.comentarios}</td>
                      <td>{val.clientes_id}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-edit"
                            onClick={() => {
                              editSale(val);
                            }}
                          >Editar</button>
                          <button
                            type="button"
                            className="btn btn-update"
                            onClick={() => openDetailModal(val)}
                          >
                            Detalle
                          </button>
                        </div>
                      </td>
                    </tr>
                  })


                }
              </tbody>
            </table>

        </div>

        {showDetailModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Añadir Detalle - Venta #{selectedSale.id}</h5>
                  <button type="button" className="btn-close" onClick={closeDetailModal}></button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <span className="input-label">Cantidad</span>
                    <input
                      type="text"
                      className="input-field"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      placeholder="Añade el detalle de la venta"
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Precio unitario</span>
                    <input
                      type="text"
                      className="input-field"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      placeholder="Añade el detalle de la venta"
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Subtotal</span>
                    <input
                      type="text"
                      className="input-field"
                      value={subtotal}
                      onChange={(e) => setSubtotal(e.target.value)}
                      placeholder="Añade el detalle de la venta"
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Codigo Producto</span>
                    <input
                      type="text"
                      className="input-field"
                      value={productoid}
                      onChange={(e) => setProductoid(e.target.value)}
                      placeholder="Añade el detalle de la venta"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-cancel" onClick={closeDetailModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-register" onClick={saveDetail}>
                    Guardar Detalle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>


    </>
  )
}