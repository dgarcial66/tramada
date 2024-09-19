import { useState } from "react";
import { Header } from "../Header/Header";
import "./suppliers.css"; // Importa el archivo CSS para la sección de Suppliers
import { useNavigate } from "react-router-dom";

export function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [codigoProveedor, setCodigoProveedor] = useState("");
  const [telefonoProveedor, setTelefonoProveedor] = useState("");
  const [direccionProveedor, setDireccionProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProveedor = {
      nombreProveedor,
      codigoProveedor,
      telefonoProveedor,
      direccionProveedor,
      emailProveedor,
    };
    if (editIndex !== null) {
      // Modificar un proveedor existente
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editIndex] = nuevoProveedor;
      setSuppliers(updatedSuppliers);
      setEditIndex(null);
    } else {
      // Agregar nuevo proveedor
      setSuppliers([...suppliers, nuevoProveedor]);
    }
    // Limpiar los campos
    setNombreProveedor("");
    setCodigoProveedor("");
    setTelefonoProveedor("");
    setDireccionProveedor("");
    setEmailProveedor("");
  };

  const handleEdit = (index) => {
    const proveedor = suppliers[index];
    setNombreProveedor(proveedor.nombreProveedor);
    setCodigoProveedor(proveedor.codigoProveedor);
    setTelefonoProveedor(proveedor.telefonoProveedor);
    setDireccionProveedor(proveedor.direccionProveedor);
    setEmailProveedor(proveedor.emailProveedor);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSuppliers(suppliers.filter((_, i) => i !== index));
  };

  const filteredSuppliers = suppliers.filter((proveedor) =>
    proveedor.codigoProveedor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <button className="button-back" onClick={() => navigate('/home')} /> 
      <div className="suppliers-container1">
        <h1>Gestión de Proveedores</h1>


        {/* Formulario para agregar o modificar proveedores */}
        <form onSubmit={handleSubmit} className="form-supplier1">
          <div className="form-group1">
            <label>Nombre del Proveedor</label>
            <input
              type="text"
              value={nombreProveedor}
              onChange={(e) => setNombreProveedor(e.target.value)}
              required
              className="input-text1"
            />
          </div>
          <div className="form-group1">
            <label>Código del Proveedor</label>
            <input
              type="text"
              value={codigoProveedor}
              onChange={(e) => setCodigoProveedor(e.target.value)}
              required
              className="input-text1"
            />
          </div>
          <div className="form-group1">
            <label>Teléfono del Proveedor</label>
            <input
              type="text"
              value={telefonoProveedor}
              onChange={(e) => setTelefonoProveedor(e.target.value)}
              required
              className="input-text1"
            />
          </div>
          <div className="form-group1">
            <label>Dirección del Proveedor</label>
            <input
              type="text"
              value={direccionProveedor}
              onChange={(e) => setDireccionProveedor(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <div className="form-group1">
            <label>Email del Proveedor</label>
            <input
              type="email"
              value={emailProveedor}
              onChange={(e) => setEmailProveedor(e.target.value)}
              required
              className="input-text"
            />
          </div>
          <button type="submit" className="btn-submit1">
            {editIndex !== null ? "Modificar" : "Agregar"} Proveedor
          </button>
        </form>
        </div>

        {/* Buscador */}
        
        <div className="search-container1">
          <label>Buscar Proveedor por Código</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-text"
          />
        </div>


        {/* Lista de proveedores */}
        <h2>Lista de Proveedores</h2>
        {filteredSuppliers.length === 0 ? (
          <p className="ppp">No hay proveedores disponibles.</p>
        ) : (
          <ul className="supplier-list1">
            {filteredSuppliers.map((proveedor, index) => (
              <li key={index} className="supplier-item">
                Nombre: {proveedor.nombreProveedor} | 
                Código: {proveedor.codigoProveedor} | 
                Teléfono: {proveedor.telefonoProveedor} | 
                Dirección: {proveedor.direccionProveedor} | 
                Email: {proveedor.emailProveedor}
                <div className="supplier-actions1">
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
      
    </>
  );
}
