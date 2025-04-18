import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { useMaterials } from "../../hooks/useMaterial.jsx";
import { formatValues, handleDelete, handleEdit } from "../../utils/utils.js";
import { updateMaterial, deleteMaterial, createMaterial } from "../../actions/rawMaterial.js";
import { Modal } from "../Modal/Modal.jsx";
import './rawMaterials.css';
import { UpdateItems } from "../UpdateItems/UpdateItems.jsx";
import fondoInsumos from "../../../asset/img/fondo_insumos.png";
import axios from "axios";


export function RawMaterials({ user, setUser }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState('');
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [idMaterial, setIdMaterial] = useState(null);
  const [listType, setListType] = useState('none');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [notModify, setNotModify] = useState(false);
  const [textModal, setTextModal] = useState('Agregar');
  const [textInfo, setTextInfo] = useState('material');
  const [proveedores, setProveedores] = useState([]);
  
  const [categoriasInsumos, setCategoriasInsumos] = useState([]);
  
  const { search,
    setSearch,
    materials,
    setMaterials,
    nameSupplier,
    setNameSupplier,
    supplies,
    categories,
    filteredMaterials
  } = useMaterials();
  const [listMaterials, setListMaterials] = useState(filteredMaterials());

  const navigate = useNavigate();


  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/supplier');
        setProveedores(response.data);
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

// 2. Cargar categorías
useEffect(() => {
  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/raw-categories");
      
      // Manejo específico para MariaDB
      let categorias = [];
      if (response.data.success) {
        categorias = Array.isArray(response.data.data) 
          ? response.data.data 
          : response.data.data 
            ? [response.data.data] 
            : [];
      }

      setCategoriasInsumos(categorias.map(cat => ({
        id: cat.id,
        nombre_categoria_insumo: cat.nombre || cat.nombre_categoria_insumo
      })));
      
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      // Datos mock de respaldo
      setCategoriasInsumos([
        { id: 1, nombre_categoria_insumo: "Materiales para tejidos" },
        { id: 2, nombre_categoria_insumo: "Herramientas de confección" },
        { id: 3, nombre_categoria_insumo: "Equipos de maquinaria textil" }
      ]);
    }
  };

  fetchCategorias();
}, []);


  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchMaterial = () => {
      const result = filteredMaterials();
      setListMaterials(result);
    };
    setTextInfo('material');
    fetchMaterial();
  }, [materials, search, nameSupplier]);

  useEffect(() => {
    if (idMaterial !== null) {
      const material = materials.find(item => item.id === idMaterial);
      if (material) {
        setName(material.nombre_insumo);
        setColor(material.color_insumo);
        setStock(material.cantidad_insumo);
        setWeight(material.peso_insumo);
        setPrice(material.precio_insumo);
        setVendor(material.id_proveedor);
        setCategory(material.categoria_insumos_id);
      }
    }
  }, [materials, idMaterial, isOpenModal]);

  const handlerDeleteMaterial = async (id) => {
    try {
      const rta = await deleteMaterial(id);
      console.log(rta);
      return rta;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      // Convertir valores numéricos y validar
      const peso = parseFloat(weight);
      const cantidad = parseFloat(stock);
      const precio = parseFloat(price);
      
      if (isNaN(peso) || isNaN(cantidad) || isNaN(precio)) {
        throw new Error("Los valores de peso, stock y precio deben ser números válidos");
      }
  
      // Obtener nombres de proveedor y categoría
      const proveedorSeleccionado = proveedores.find(p => p.id === vendor);
      const categoriaSeleccionada = categoriasInsumos.find(c => c.id === category);
  
      if (!proveedorSeleccionado || !categoriaSeleccionada) {
        throw new Error("Proveedor o categoría no válidos");
      }
  
      const newMaterial = {
        nombre_insumo: name,
        color_insumo: color,
        peso_insumo: peso,
        cantidad_insumo: cantidad,
        precio_insumo: precio,
        nombre_proveedor: proveedorSeleccionado.nombre_proveedor,
        nombre_categoria_insumo: categoriaSeleccionada.nombre_categoria_insumo,
        id_proveedor: proveedorSeleccionado.id,
        categoria_insumos_id: categoriaSeleccionada.id,
      };
      
      if (idMaterial !== null) {
        // Lógica para actualización
        const updatedMaterial = await updateMaterial(idMaterial, newMaterial);
        const updateList = listMaterials.map(material => 
          material.id === idMaterial ? updatedMaterial.data : material
        );
        setListMaterials(updateList);
        setMaterials(updateList);
        setTextModal('actualizado');
      } else {
        // Lógica para creación - Usa la respuesta completa del backend
        const response = await createMaterial(newMaterial);
        
        // Actualiza ambos estados con la respuesta completa
        setListMaterials(prev => [...prev, response.data]);
        setMaterials(prev => [...prev, response.data]);
        
        setTextModal('creado');
      }
  
      setIsOpen(true);
      formatValues({
        setName,
        setColor,
        setStock,
        setWeight,
        setPrice,
        setVendor,
        setCategory,
        setIdMaterial
      });
      setNotModify(false);
      
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setNotModify(true);
    }
  };

  return (
    <>
      <section className="container-father-services" style={{backgroundImage:`url(${fondoInsumos})`}}>
        <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
        <div className="container">

          {/* Formulario para agregar o modificar productos */}

          <div className="card">
            <div className="card-header">Gestión de material</div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Nombre del Material</span>
                <input placeholder="Nombre del material"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Color</span>
                <input placeholder="Color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="input-field"
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Stock</span>
                <input placeholder="Stock"
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="input-field"
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Peso (kg)</span>
                <input placeholder="Peso en kg"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="input-field"
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Precio</span>
                <input placeholder="Precio en COP"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="input-field"
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </div>


                          <div className="input-group">
              <span className="input-label">Proveedor</span>
              <select
                id="proveedor"
                name="proveedor"
                value={vendor}
                onChange={(e) => setVendor(Number(e.target.value))}
                className="input-field"
                required
                style={{ backgroundColor: "white", color: "black" }}
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre_proveedor}
                  </option>
                ))}
              </select>
            </div>

              
              
            <div className="input-group">
              <span className="input-label">Categoría</span>
              <select
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                className="input-field"
                required
                style={{ backgroundColor: "white", color: "black" }}
              >
                <option value="">Seleccione una categoría</option>
                {categoriasInsumos.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre_categoria_insumo}
                  </option>
                ))}
              </select>
            </div>

              <div className="form-btn-edit">
                <button
                  className="btn btn-register"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  {idMaterial !== null ? "Modificar" : "Agregar"} Material
                </button>
                {notModify && <p className="text-danger">El proveedor o la categoria no existen para el insumo.</p>}
              </div>



              <div className="input-group">
                <span className="input-label">Buscar Material</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="btn-filter--supplier">
                <button
                  className="btn btn-register"
                  onClick={() => {
                    if (listType === "none") setListType("block");
                    else if (listType === "block") setListType("none");
                  }}
                >
                  Filtrar
                </button>
                <ul className={`list-btn-supplier ${listType} `} style={{ backgroundColor: "white" }}>
                  {supplies?.map((supplies) => (
                    <li
                      className="list-group-item"
                      key={supplies.id} onClick={() => setNameSupplier(supplies.nombre_proveedor)}
                      style={{ backgroundColor: "white", color: "black" }}>
                      {supplies.nombre_proveedor}
                    </li>
                  ))}
                  <li onClick={() => setNameSupplier('')} style={{ backgroundColor: "white", color: "black" }}>todos</li>
                </ul>
              </div>
            </div>
          </div>

          <h1 style={{color:"white"}}>Lista de materiales</h1>
          {listMaterials ? (
            <table className="table" style={{marginTop:"1px"}} >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Color</th>
                  <th>Stock</th>
                  <th>Peso</th>
                  <th>Precio</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listMaterials?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.nombre_insumo}</td>
                    <td>{item.color_insumo}</td>
                    <td>{item.cantidad_insumo}</td>
                    <td>{item.peso_insumo} Kg</td>
                    <td>${item.precio_insumo}</td>
                    <td>
                      {categoriasInsumos.find(cat => cat.id === item.categoria_insumos_id)?.nombre_categoria_insumo || 
                      item.categoria || 
                      item.categoria_insumos_id}
                    </td>

                    <td>
                      <button
                        onClick={async () => {
                          const selectedMaterial = materials[index];
                          setIdMaterial(selectedMaterial.id);
                          await handleEdit({
                            materials,
                            index,
                            setName,
                            setStock,
                            setColor,
                            setWeight,
                            setPrice,
                            setVendor,
                            setCategory
                          });
                        }}
                        className="btn btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          setIdMaterial(item.id);
                          setIsOpenModal(true);
                        }}
                        className="btn btn-delete"
                      >
                        Descontar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay Material disponibles.</p>
          )}
        </div>


      </section>


      <Modal
        isOpen={isOpen}
        textModal={textModal}
        setIsOpen={setIsOpen}
        textInfo={textInfo}
      />
      {isOpenModal ?
        <UpdateItems
          setName={setName}
          setColor={setColor}
          setStock={setStock}
          setWeight={setWeight}
          setPrice={setPrice}
          setVendor={setVendor}
          setCategory={setCategory}
          setIdMaterial={setIdMaterial}
          setIsOpenModal={setIsOpenModal}
          id={idMaterial}
        /> : null
      }
    </>
  );
}
