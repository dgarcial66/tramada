import { useState } from "react";
import "./productos.css"; // Importamos el archivo CSS

export function Productos() {
  const [productos, setProductos] = useState([]); 
  const [nombre, setNombre] = useState(""); 
  const [precio, setPrecio] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      
      const updatedProducts = [...productos];
      updatedProducts[editIndex] = { nombre, precio };
      setProductos(updatedProducts);
      setEditIndex(null);
    } else {
      
      setProductos([...productos, { nombre, precio }]);
    }
    setNombre("");
    setPrecio("");
  };


  const handleEdit = (index) => {
    const product = productos[index];
    setNombre(product.nombre);
    setPrecio(product.precio);
    setEditIndex(index);
  };

 
  const handleDelete = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

 
  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-productos-container">
      <h1>Gestión de Productos</h1>

      {}
      <form onSubmit={handleSubmit} className="form-producto">
        <div className="form-group">
          <label>Nombre del Producto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="input-text"
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="input-text"
          />
        </div>
        <button type="submit" className="btn-submit">
          {editIndex !== null ? "Modificar" : "Agregar"} Producto
        </button>
      </form>

      {}
      <div className="search-container">
        <label>Buscar Producto</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-text"
        />
      </div>

      {}
      <h2>Lista de Productos</h2>
      {filteredProducts.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className="product-list">
          {filteredProducts.map((product, index) => (
            <li key={index} className="product-item">
              {product.nombre} - ${product.precio}
              <div className="product-actions">
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
  );
}