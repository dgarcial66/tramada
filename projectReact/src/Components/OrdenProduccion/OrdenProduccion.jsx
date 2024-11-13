import { useState } from "react";
import { Header } from "../Header/Header";
import "./ordenproduccion.css"; // Importamos el archivo CSS
import { useNavigate } from "react-router-dom";

export function OrdenProduccion() {
  const [ordenes, setOrdenes] = useState([]); 
  const [fechaSolicitud, setFechaSolicitud] = useState(""); 
  const [cantidadInsumos, setCantidadInsumos] = useState(""); 
  const [codigoOrden, setCodigoOrden] = useState(""); 
  const [fechaCulminacion, setFechaCulminacion] = useState(""); 
  const [codigoEmpleado, setCodigoEmpleado] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaOrden = { 
      fechaSolicitud, 
      cantidadInsumos, 
      codigoOrden, 
      fechaCulminacion, 
      codigoEmpleado 
    };

    if (editIndex !== null) {
      // Modificar una orden existente
      const updatedOrdenes = [...ordenes];
      updatedOrdenes[editIndex] = nuevaOrden;
      setOrdenes(updatedOrdenes);
      setEditIndex(null);
    } else {
      // Agregar nueva orden
      setOrdenes([...ordenes, nuevaOrden]);
    }

    // Limpiar los campos
    setFechaSolicitud("");
    setCantidadInsumos("");
    setCodigoOrden("");
    setFechaCulminacion("");
    setCodigoEmpleado("");
  };

  const handleEdit = (index) => {
    const orden = ordenes[index];
    setFechaSolicitud(orden.fechaSolicitud);
    setCantidadInsumos(orden.cantidadInsumos);
    setCodigoOrden(orden.codigoOrden);
    setFechaCulminacion(orden.fechaCulminacion);
    setCodigoEmpleado(orden.codigoEmpleado);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setOrdenes(ordenes.filter((_, i) => i !== index));
  };

  const filteredOrdenes = ordenes.filter((orden) =>
    orden.codigoOrden.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <button className="button-back" onClick={() => navigate('/home')} /> 
      <div className="orden-produccion-container">
        <h1>Gestión de Órdenes de Producción</h1>

        {/* Formulario para agregar o modificar órdenes */}
        <form onSubmit={handleSubmit} className="form-orden">
          <div className="form-group">
            <label>Fecha de Solicitud</label>
            <input
              type="date"
              value={fechaSolicitud}
              onChange={(e) => setFechaSolicitud(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <div className="form-group">
            <label>Cantidad de Insumos</label>
            <input
              type="number"
              value={cantidadInsumos}
              onChange={(e) => setCantidadInsumos(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <div className="form-group">
            <label>Código de la Orden</label>
            <input
              type="text"
              value={codigoOrden}
              onChange={(e) => setCodigoOrden(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <div className="form-group">
            <label>Fecha de Culminación</label>
            <input
              type="date"
              value={fechaCulminacion}
              onChange={(e) => setFechaCulminacion(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <div className="form-group">
            <label>Código del Empleado</label>
            <input
              type="text"
              value={codigoEmpleado}
              onChange={(e) => setCodigoEmpleado(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <button type="submit" className="btn-submit">
            {editIndex !== null ? "Modificar" : "Agregar"} Orden
          </button>
        </form>

        {/* Buscador */}
        <div className="search-container">
          <label>Buscar Orden por Código</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-text"
          />
        </div>

        {/* Lista de órdenes */}
        <h2>Lista de Órdenes de Producción</h2>
        {filteredOrdenes.length === 0 ? (
          <p>No hay órdenes disponibles.</p>
        ) : (
          <ul className="orden-list">
            {filteredOrdenes.map((orden, index) => (
              <li key={index} className="orden-item">
                <strong>Código:</strong> {orden.codigoOrden} | 
                <strong>Fecha de Solicitud:</strong> {orden.fechaSolicitud} | 
                <strong>Cantidad de Insumos:</strong> {orden.cantidadInsumos} | 
                <strong>Fecha de Culminación:</strong> {orden.fechaCulminacion} | 
                <strong>Código Empleado:</strong> {orden.codigoEmpleado}
                <div className="orden-actions">
                  <button onClick={() => handleEdit(index)} className="btn-edit">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}