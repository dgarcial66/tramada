/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
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

  const [clients, setClients] = useState([]); 
 

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [productoid, setProductoid] = useState("");
  const [productos, setProductos] = useState([]);


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
    Axios.get(`${API_URL}/api/v1/clients`).then((response) => {
      setClients(response.data);  
    });
  }, []);
  
  useEffect(() => {
    Axios.get(`${API_URL}/api/v1/products`).then((response) => {
      setProductos(response.data);
    });
  }, []);


  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/');
    } else {
      getSales();
    }
  }, [user, navigate]);

  const getSales = () => {
    Axios.get(`${API_URL}/api/v1/sales`).then((response) => {
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
    Axios.post(`${API_URL}/api/v1/sales`, {
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
    setId(val.id); 
  
    setFecha(val.fecha_venta);
    setEstado(val.estado_pago);
    setTipoV(val.tipo_venta);
    setTotalV(val.total_venta);
    setComentarios(val.comentarios);
    setClient(val.clientes_id);
  };
  

  const updateSales = () => {
    Axios.put(`${API_URL}/api/v1/sales`, {
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
    Axios.post(`${API_URL}/api/v1/detail-sales`, {
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

  function formatDateForInput(dateString) {
    if (!dateString) return ''; // para evitar errores si es null o undefined
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // formato "YYYY-MM-DDTHH:mm"
  }
  


  return (
    <>
      <section className="container-father-services">
       <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />

        <div className="container">
          <div className="card">
            <div className="card-header">
              GESTION VENTAS
            </div>
            <div className="card-body">
              
            <div className="input-group">
              <span className="input-label" id="basic-addon1">Fecha venta</span>
              <input
                type="datetime-local"
                value={formatDateForInput(fecha)}
                onChange={(event) => {
                  setFecha(event.target.value);
                }}
                className="input-field"
                placeholder="Fecha venta"
                aria-label="Fecha venta"
                aria-describedby="basic-addon1"
              />
            </div>


                
                   {/* Aquí esta el select para tipo de venta */}
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Estado de pago</span>
                <select
                  value={estado}
                  onChange={(event) => setEstado(event.target.value)}
                  className="input-field"
                  aria-label="Estado de pago"
                >
                  <option value="">Selecciona estado</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Anulado">Anulado</option>
                </select>
              </div>


                {/* Aquí esta el select para tipo de venta */}
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Tipo de venta</span>
                <select
                  value={tipoV}
                  onChange={(event) => setTipoV(event.target.value)}
                  className="input-field"
                  aria-label="Tipo de venta"
                >
                  <option value="">Selecciona tipo de venta</option>
                  <option value="Al Por Mayor">Al Por Mayor</option>
                  <option value="Al Detal">Al Detal</option>
                </select>
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

               {/* Aquí esta el select para el nombre del cliente */}     
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Cliente</span>
                <select
                  value={client}
                  onChange={(event) => setClient(event.target.value)}
                  className="input-field"
                  aria-label="Cliente"
                >
                  <option value="">Selecciona un cliente</option>
                  {clients.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre_cliente} 
                    </option>
                  ))}
                </select>
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
                  <th scope="col">Nombre Cliente</th>
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
                      <td>{
                              clients.find(c => c.id === val.clientes_id)?.nombre_cliente || "Sin nombre"
                            }
                          </td>
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

                  {/*aqui esta el select para productos en detalle de venta */}
                  <div className="input-group">
                    <span className="input-label">Producto</span>
                    <select
                      value={productoid}
                      onChange={(e) => setProductoid(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Selecciona un producto</option>
                      {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre_producto}
                        </option>
                      ))}
                    </select>
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