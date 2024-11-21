function RestructuracionProduct() {
    return (
        <>
        <Header user={user} setUser={setUser} />
        <button className="button-back" onClick={() => navigate('/home')} />
        <div className="menu-productos-container">
          <h1>Gestión de {textButton}</h1>
  
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

            <button type="submit" className="btn-submit">
              {editIndex !== null ? "Modificar" : "Agregar"} {textButton}
            </button>
            <button type="button" className="btn-submit" onClick={() => navigate('/OrdenProduccion')}>Orden de produccion</button>
          </form>
  
          {/* Buscador */}
          <div className="search-container">
            <label>Buscar {textButton}</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-text"
            />
          </div>
  
          {/* Lista de productos */}
          <h2>Lista de {textButton}</h2>
          {!filterLists?.length ? (
            <p>No hay {textButton} disponibles.</p>
          ) : (
              <ul className="product-list">
              {filterLists?.map((item, index) => (
                <li key={index} className="product-item">
                  {filteredProducts?.length ? (
              <>
                {item.name} - ${item.price} - Código: {item.code} - 
                Stock: {item.stock} - Categoría: {item.category} - Peso: {item.weight} kg
              </>
            ) : (
              <>
                Nombre: {item.name} - Gerente: {item.co} - Dirección: {item.address} - 
                Teléfono: {item.numberPhone}
              </>
            )}
                  <div className="product-actions">
                    <button onClick={() => handleEdit({
                        products,
                        clients,
                        index,
                        setName,
                        setPrice,
                        setCode,
                        setStock,
                        setCategory,
                        setWeight,
                        setEditIndex,
                        setAddress,
                        setNumberPhone,
                        setCo,
                      })} className="btn-edit">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete({
                        products,
                        clients,
                        index,
                        setProducts,
                        setClients,
                      })}
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