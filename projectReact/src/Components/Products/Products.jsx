import { useState } from "react";
import { Header } from "../Header/Header";
import "./productos.css"; // Importamos el archivo CSS
import { useNavigate } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]); 
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { name: name, price: price };
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      
      setProducts([...products, { name: name, price: price }]);
    }
    setName("");
    setPrice("");
  };


  const handleEdit = (index) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setEditIndex(index);
  };

 
  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

 
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <button className='button-back' onClick={() => navigate('/home')} /> 
    <div className="menu-productos-container">
      <h1>Gestión de Productos</h1>
      <form onSubmit={handleSubmit} className="form-producto">
        <div className="form-group">
          <label>Nombre del Producto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-text"
            />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
              {product.name} - ${product.price}
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
  </>
  );
}