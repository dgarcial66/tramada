import './ordenproduccion.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { Header } from "../Header/Header.jsx";
import { useNavigate } from 'react-router-dom';
import ReportOrdenProduccion from "../../../asset/Reports/reportOrdenProduccition/reportOrdenProduccition.jsx";
import { PDFDownloadLink } from '@react-pdf/renderer';




function OrdenProduccion({ user, setUser }) {
  const [fecha_entrega, setFechaEntrega] = useState('');
  const [cantidad_productos_solicitada, setCantidadProductosSolicitada] = useState('');
  const [cantidad_insumo_necesaria, setCantidadInsumoNecesaria] = useState('');
  const [usuario_id, setUsuarioId] = useState('');
  const [anotaciones, setAnotaciones] = useState('');
  const [estado_orden, setEstadoOrden] = useState('en proceso');
  const [insumos_id, setInsumosId] = useState('');
  const [producto_id, setProductoId] = useState('');
  const [ordenesList, setOrdenes] = useState([]);
  const [editar, setEditar] = useState(false);

  const [id, setId] = useState();

  const navigate = useNavigate();

  const add = () => {

    if (!fecha_entrega || !cantidad_productos_solicitada || !cantidad_insumo_necesaria || !usuario_id || !insumos_id || !producto_id) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios antes de enviar.",
      });
      return;
    }

    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fecha_entrega)) {
      Swal.fire({
        icon: "error",
        title: "Fecha inválida",
        text: "La fecha debe estar en formato válido (YYYY-MM-DDTHH:MM).",
      });
      return;
    }


    const fechaEntregadaFormateada = formatDateForDB(fecha_entrega);

    if (isNaN(cantidad_productos_solicitada) || isNaN(cantidad_insumo_necesaria)) {
      Swal.fire({
        icon: "error",
        title: "Cantidad inválida",
        text: "Las cantidades deben ser números válidos.",
      });
      return;
    }

    Axios.post("http://localhost:3000/api/v1/order", {
      fecha_entrega: fechaEntregadaFormateada,
      cantidad_productos_solicitada: cantidad_productos_solicitada,
      cantidad_insumo_necesaria: cantidad_insumo_necesaria,
      usuario_id: usuario_id,
      anotaciones: anotaciones,
      estado_orden: estado_orden,
      insumos_id: insumos_id,
      producto_id: producto_id,
    })
      .then(() => {

        getOrdenes();
        limpiarCampos();


        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: `<i>La orden fue registrada con éxito!</i>`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {

        const errorMessage = error.response?.data?.error || error.message || "Ocurrió un error desconocido.";
        Swal.fire({
          icon: "error",
          title: "Error al registrar la orden",
          text: errorMessage,
        });
        console.error("Error al agregar orden:", error);
      });
  };


  const update = () => {
    Axios.put(`http://localhost:3000/api/v1/order/${id}`, {
      fecha_entrega: fecha_entrega,
      cantidad_productos_solicitada: cantidad_productos_solicitada,
      cantidad_insumo_necesaria: cantidad_insumo_necesaria,
      usuario_id: usuario_id,
      anotaciones: anotaciones,
      estado_orden: estado_orden,
      insumos_id: insumos_id,
      producto_id: producto_id,
    })
      .then(() => {
        getOrdenes();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa</strong>",
          html: "<i>La orden fue actualizada con éxito!</i>",
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró actualizar la orden.",
          footer: error.message === "Network Error"
            ? "Intente más tarde"
            : error.message,
        });
        console.error("Error al actualizar la orden:", error);
      });
  };


  const deleteOrden = (val) => {
    Swal.fire({
      title: "¿Confirmar eliminación?",
      html: `<i>¿Desea eliminar la orden con ID <strong>${val.id}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarla!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3000/api/v1/order/${val.id}`)
          .then(() => {
            getOrdenes();
            limpiarCampos();
            Swal.fire({
              icon: "success",
              title: `La orden con ID ${val.id} fue eliminada`,
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logró eliminar la orden.",
              footer: error.message === "Network Error"
                ? "Intente más tarde."
                : error.message,
            });
            console.error("Error al eliminar la orden:", error);
          });
      }
    });
  };




  const limpiarCampos = () => {
    setFechaEntrega("");
    setCantidadProductosSolicitada("");
    setCantidadInsumoNecesaria("");
    setUsuarioId("");
    setAnotaciones("");
    setEstadoOrden("");
    setInsumosId("");
    setProductoId("");
    setId("");
    setEditar(false);
  };


  const editarOrden = (val) => {
    setFechaEntrega(val.fecha_entrega);
    setCantidadProductosSolicitada(val.cantidad_productos_solicitada);
    setCantidadInsumoNecesaria(val.cantidad_insumo_necesaria);
    setUsuarioId(val.usuario_id);
    setAnotaciones(val.anotaciones);
    setEstadoOrden(val.estado_orden);
    setInsumosId(val.insumos_id);
    setProductoId(val.producto_id);
    setEditar(true);
    setId(val.id);
  };


  const formatDateForDB = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };



  const getOrdenes = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/api/v1/order");
      setOrdenes(response.data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo obtener la lista de órdenes.",
        footer: error.message === "Network Error" ? "Verifique su conexión al servidor" : error.message,
      });
    }
  };


  useEffect(() => {
    getOrdenes();
  }, []);

  const handleGenerarReporte = () => {

  };


  return (
    <>
      <Header user={user} setUser={setUser} />
      <button className="button-back" onClick={() => navigate("/home")} />
      <div className="container">
        <div className="card">
          <div className="card-header">GESTIÓN DE ÓRDENES DE PRODUCCIÓN</div>
          <div className="card-body">
            <div className="input-group">
              <span className="input-label">Fecha de Solicitud:</span>
              <input
                type="datetime-local"
                onChange={(event) => setFechaEntrega(event.target.value)}
                className="input-field-"
                value={fecha_entrega}
                placeholder="Fecha de entrega"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Cantidad productos solicitada:</span>
              <input
                type="number"
                value={cantidad_productos_solicitada}
                onChange={(event) => setCantidadProductosSolicitada(event.target.value)}
                className="input-field"
                placeholder="Cantidad de productos solicitada"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Cantidad de Insumos necesarios:</span>
              <input
                type="number"
                value={cantidad_insumo_necesaria}
                onChange={(event) => setCantidadInsumoNecesaria(event.target.value)}
                className="input-field"
                placeholder="Cantidad de insumos necesarios"
              />
            </div>

            <div className="input-group">
              <span className="input-label">ID de Empleado:</span>
              <input
                type="number"
                value={usuario_id}
                onChange={(event) => setUsuarioId(event.target.value)}
                className="input-field"
                placeholder="ID del empleado"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Anotaciones:</span>
              <input
                type="text"
                value={anotaciones}
                onChange={(event) => setAnotaciones(event.target.value)}
                className="input-field"
                placeholder="Anotaciones"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Estado de la orden:</span>
              <select
                value={estado_orden}
                onChange={(event) => setEstadoOrden(event.target.value)}
                className="input-field"
              >
                <option value="en proceso">En proceso</option>
                <option value="completado">Completado</option>
                <option value="en revision">En revisión</option>
              </select>
            </div>

            <div className="input-group">
              <span className="input-label">ID de los insumos:</span>
              <input
                type="number"
                value={insumos_id}
                onChange={(event) => setInsumosId(event.target.value)}
                className="input-field"
                placeholder="ID de insumos"
              />
            </div>

            <div className="input-group">
              <span className="input-label">ID de producto:</span>
              <input
                type="number"
                value={producto_id}
                onChange={(event) => setProductoId(event.target.value)}
                className="input-field"
                placeholder="ID del producto"
              />
            </div>
          </div>

          <div className="card-footer">
            <button className="btn btn-edit" style={{ color: "white" }} onClick={handleGenerarReporte}>

              <PDFDownloadLink
                document={<ReportOrdenProduccion orden_de_produccion={ordenesList} />}
                fileName="reporte_orden_produccion.pdf"
              >
                {({ loading }) => (
                  loading ? "Cargando reporte..." : <span style={{ color: "black" }}>Descargar Reporte</span>
                )}
              </PDFDownloadLink>
            </button>
            {editar ? (
              <div>
                <button className="btn btn-update" onClick={update}>
                  Actualizar
                </button>
                <button className="btn btn-cancel" onClick={limpiarCampos}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="btn btn-register" onClick={add}>
                Registrar
              </button>
            )}


          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Fecha de Entrega</th>
              <th scope="col">Cantidad Solicitada</th>
              <th scope="col">Cantidad Insumos</th>
              <th scope="col">ID Empleado</th>
              <th scope="col">Anotaciones</th>
              <th scope="col">Estado Orden</th>
              <th scope="col">ID Insumos</th>
              <th scope="col">ID Producto</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesList.map((val) => (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{new Date(val.fecha_entrega).toLocaleString()}</td>
                <td>{val.cantidad_productos_solicitada}</td>
                <td>{val.cantidad_insumo_necesaria}</td>
                <td>{val.usuario_id}</td>
                <td>{val.anotaciones || "No hay anotaciones"}</td>
                <td>{val.estado_orden}</td>
                <td>{val.insumos_id}</td>
                <td>{val.producto_id}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      onClick={() => editarOrden(val)}
                      className="btn btn-edit"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteOrden(val)}
                      className="btn btn-delete"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export { OrdenProduccion };