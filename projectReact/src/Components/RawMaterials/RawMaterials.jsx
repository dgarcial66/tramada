import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../Header/Header";
import { useMaterials } from "../../hooks/useMaterial.jsx";
import { handleDelete, handleEdit } from "../../utils/utils.js"
import { updateMaterial, deleteMaterial } from "../../actions/rawMaterial.js";
import { Modal } from "../Modal/Modal.jsx";
import './rawMaterials.css';

export function RawMaterials({ user, setUser}) {
  const [ id, setId ] = useState(null);
  const [ name, setName ] = useState("");
  const [ typeMaterial, setTypeMaterial] = useState("");
  const [ color, setColor ] = useState("");
  const [ stock, setStock ] = useState("");
  const [ weight, setWeight ] = useState("");
  const [ price, setPrice ] = useState('');
  const [ vendor, setVendor ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ idMaterial, setIdMaterial ]  = useState(null);
  const [ listType, setListType ] = useState('none');
  const [ isOpen, setIsOpen ] = useState(false);
  const [ notModify, setNotModify ] = useState(false);
  const [ textModal, setTextModal ] = useState('Agregar');
  const { search,
            setSearch,
            materials,
            setIdSupplier,
            supplies,
            categories,
            filteredMaterials
        } = useMaterials();

    const navigate = useNavigate()
    console.log(filteredMaterials());
    
    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
            navigate('/')
        }
    }, [user, navigate])
    const handlerDeleteMaterial = async (id) => {
      try {
        const rta = await deleteMaterial(id);
        console.log(rta);
        return rta;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    const handleSubmit = async (e) => {
      let rta;
      try {
          e.preventDefault();
          const newMaterials = { 
            nombre_insumo: name,
            tipo_insumo: typeMaterial,
            color_insumo: color,
            cantidad_insumo: stock,
            peso_insumo: weight,
            precio_insumo: price,
            id_proveedor: vendor,
            categoria_insumos_id: category
          };
          const values = Object.values(newMaterials);
          
          console.log(idMaterial);
          
          if(values !== undefined) {
            if (idMaterial !== null) {
              try{

                rta = await updateMaterial(newMaterials, idMaterial)
                console.log(rta);
                setTextModal('actualizado');
                setIsOpen(true);
              }catch(err) {
                console.log(err);
                throw err;
              }
            }

            setName("");
            setTypeMaterial('')
            setColor('');
            setStock("");
            setWeight("");
            setPrice('');
            setVendor("");
            setCategory("");
            console.log('Áqui 3');

            setNotModify(false);
            return;
          } 
        }catch (error) {
          setNotModify(true);
          throw error;
        }
    };
    console.log(id);
    return (
        <>
          <Header user={user} setUser={setUser} />
          <button className="button-back" onClick={() => navigate("/home")} />
          <div className="menu-productos-container">
            <h1>Gestión de Material</h1>
    
            {/* Formulario para agregar o modificar productos */}
            <form className="form-producto">
              <div className="form-group">
                <label>Nombre del Material</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Tipo del Material</label>
                <input
                  type="text"
                  value={typeMaterial}
                  onChange={(e) => setTypeMaterial(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Peso (kg)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Precio </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Proveedor </label>
                <input
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Categoria </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-btn-info">
                <button className="btn-submit" onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}>
                  {idMaterial !== null ? "Modificar" : "Agregar"} Material
                </button>
                {notModify && <p>El proveedor o la categoria no existen para el insumo.</p>
                }
              </div>
            </form>
    
            <div className="search-container">
              <label>Buscar Material</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-text"
              />
            </div>
    
            <div className="btn-filter--supplier">
              <button
                className="btn-submit"
                onClick={() => {
                  if (listType === "none") setListType("block");
                  else if (listType === "block") setListType("none");
                }}
              >
                Filtrar
              </button>
              <ul className={`list-btn-supplier ${listType} `}>
                {supplies?.map((supplies) => (
                  <li key={supplies.id} onClick={() => setIdSupplier(supplies.id)}>
                    {supplies.nombre_proveedor}
                  </li>
                ))}
                <li onClick={() => setIdSupplier(0)}>todos</li>
              </ul>
            </div>
            <h2>Lista de Material</h2>
    
            {filteredMaterials().length > 0 ? (
              <ul className="product-list">
                {filteredMaterials()?.map((item, index) => (
                  <li key={item.id} className="product-item">
                    <>
                      Nombre del Material: {item.nombre_insumo} - Tipo de Material: {item.tipo_insumo} - Color: {item.color_insumo} - Stock:{" "}
                      {item.cantidad_insumo} - Peso: {item.peso_insumo} kg - Precio:{" "}
                      {item.precio_insumo}$ Categoria: {item.categoria}
                    </>
    
                    <div className="product-actions">
                      <button
                        onClick={() => {
                            setIdMaterial(materials[index].id);
                            console.log(idMaterial);
                            handleEdit({
                                materials,
                                index,
                                setName,
                                setStock,
                                setTypeMaterial,
                                setColor,
                                setWeight,
                                setPrice,
                                setVendor,
                                setCategory
                            })
                        }
                        }
                        className="btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          handleDelete({id: item.id, setId});
                          handlerDeleteMaterial(id);
                        }
                        }
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay Material disponibles.</p>
            )}
          </div>
          <Modal isOpen={isOpen} textModal={textModal} setIsOpen={setIsOpen} />
        </>
      );
}