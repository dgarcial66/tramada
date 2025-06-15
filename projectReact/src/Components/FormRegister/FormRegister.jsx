// eslint-disable-next-line react/prop-types
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";;
import { handleDelete, handleEdit } from '../../utils/utils';
import { Header } from "../Header/Header";
import { ApiSupplier } from '../../services/apiSupplier.js';

const suppliesService = new ApiSupplier();

export function FormRegister ({ 
    handleSubmit,
    products,
    setProducts,
    name,
    price, 
    editIndex, 
    search, 
    filteredProducts,
    setName,
    setPrice,
    setEditIndex,
    setSearch,
    code,
    setCode,
    stock,
    setStock,
    category,
    setCategory,
    weight,
    setWeight,
    textButton,
    isListClient,
    setIsListClient,
    setAddress,
    address,
    setNumberPhone,
    numberPhone,
    setCo,
    co,
    user,
    setUser,
    clients,
    setClients,
    filteredClients,
    isListMaterials,
    typeMaterial,
    setTypeMaterial,
    color,
    setColor,
    filteredMaterials,
    materials,
    setMaterials,
    setIdSupplier
}) {

  
 
  const [ supplier, setSupplier ] = useState();
  const navigate = useNavigate()
  
  const filterLists = filteredProducts?.length ? filteredProducts : filteredClients;

  console.log('SOY MATERIAL: ', materials);

  const suppliesPromise = async () => {
    const res = await suppliesService.getSupplier();
    const data = await res.json();
    setSupplies(data);
  };
  useEffect(() => {
    suppliesPromise();
  }, []);




    
    if(isListClient || filteredProducts){

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
            {
              isListMaterials && (
                <div className="form-group">
                  <label>Tipo de Materialll</label>
                  <input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    className="input-text"
                    />
                </div>
              )
            }
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
            <button type="button" className="btn-submit" onClick={() => navigate('/OrdenProduccion')}>Orden de produccion</button>
          </form>
  
          {/* barra de buscar*/}
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
}