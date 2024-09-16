import { useState } from "react"
import { Header } from "../Header/Header"
import { useNavigate } from "react-router-dom";

export function FormRegister ({ 
    handleSubmit,
    name,
    price, 
    editIndex, 
    search, 
    filteredProducts,
    setName,
    setPrice,
    setEditIndex,
    setSearch,
    handleEdit,
    handleDelete,
    code,
    stock,
    category,
    weight,
    setWeight,
    textButton,
    isListClient,
    setAddress,
    address,
    setNumberPhone,
    numberPhone,
    setCo,
    co
}) {
    const navigate = useNavigate() 

    
    return (
        <>
        <Header />
        <button className="button-back" onClick={() => navigate('/home')} />
        <div className="menu-productos-container">
          <h1>Gestión de Productos</h1>
  
          {/* Formulario para agregar o modificar productos */}
          <form onSubmit={handleSubmit} className="form-producto">
            <div className="form-group">
              <label>Nombre del {textButton}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-text"
              />
            </div>
            {
                isListClient &&
                <>
                <div className="form-group">
              <label>Administrador</label>
              <input
                type="text"
                value={co}
                onChange={(e) => setCo(e.target.value)}
                required
                className="input-text"
                />
            </div>
            <div className="form-group">
              <label>Numero de Telefono</label>
              <input
                type="text"
                value={numberPhone}
                onChange={(e) => setNumberPhone(e.target.value)}
                required
                className="input-text"
              />
            </div>
            <div className="form-group">
              <label>Direccion</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="input-text"
              />
            </div>
                </>
            }
            {
                !isListClient &&
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
            }
            {
                !isListClient &&
                <div className="form-group">
              <label>Código</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="input-text"
                />
            </div>
            }
            {
                !isListClient &&
                <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="input-text"
                />
            </div>
            }
            {
                !isListClient &&
                <div className="form-group">
              <label>Categoría</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="input-text"
                />
            </div>
            }
            {
                !isListClient &&
                <div className="form-group">
              <label>Peso (kg)</label>
              <input
                type="number"
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="input-text"
                />
            </div>
            }
            <button type="submit" className="btn-submit">
              {editIndex !== null ? "Modificar" : "Agregar"} {textButton}
            </button>
          </form>
  
          {/* Buscador */}
          <div className="search-container">
            <label>Buscar Producto</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-text"
            />
          </div>
  
          {/* Lista de productos */}
          <h2>Lista de Productos</h2>
          {filteredProducts?.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <ul className="product-list">
              {filteredProducts?.map((product, index) => (
                <li key={index} className="product-item">
                  {product.name} - ${product.price} - Código: {product.code} - 
                  Stock: {product.stock} - Categoría: {product.category} - Peso: {product.weight} kg
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
    )
}