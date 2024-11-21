function RestructuracionClient() {
    const [clients, setClients] = useState([]); 
    const [name, setName] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [search, setSearch] = useState("");
    const [numberPhone, setNumberPhone] = useState(""); 
    const [co, setCo] = useState(""); 
    const [editIndex, setEditIndex] = useState(null);

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