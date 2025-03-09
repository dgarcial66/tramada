import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { useMaterials } from "../../hooks/useMaterial.jsx";
import { formatValues, handleDelete, handleEdit } from "../../utils/utils.js";
import { updateMaterial, deleteMaterial, createMaterial } from "../../actions/rawMaterial.js";
import { Modal } from "../Modal/Modal.jsx";
import './rawMaterials.css';
import { UpdateItems } from "../UpdateItems/UpdateItems.jsx";

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
      const newMaterials = {
        nombre_insumo: name,
        color_insumo: color,
        cantidad_insumo: stock,
        peso_insumo: weight,
        precio_insumo: price,
        id_proveedor: vendor,
        categoria_insumos_id: category
      };
      const values = Object.values(newMaterials);

      console.log('CALENTURA: ', values === undefined);

      if (values !== undefined) {
        if (idMaterial !== null) {
          try {
            await updateMaterial(idMaterial, newMaterials);
            const updateList = listMaterials.map(material => material.id === idMaterial ? { ...material, ...newMaterials } : material);
            setListMaterials(updateList);
            setMaterials(updateList);
            setTextModal('actualizado');
            setIsOpen(true);
          } catch (error) {
            console.log(error);
            throw error;
          }
        } else {
          try {
            console.log('THE KILLERS');
            const newArrayMaterials = Object.values(newMaterials);
            await createMaterial(newArrayMaterials);
            const updateList = [...listMaterials, newMaterials];
            setListMaterials(updateList);
            setMaterials(updateList);
            setTextModal('creado');
            setIsOpen(true);
          } catch (error) {
            console.log(error);
            throw error;
          }
        }

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
        console.log('Áqui 3');

        setNotModify(false);
        return;
      }
    } catch (error) {
      setNotModify(true);
      throw error;
    }
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <button className="button-back" onClick={() => navigate("/home")} />
      <div className="container mt-4" style={{ backgroundColor: "white", color: "black" }}>
        <h1>Gestión de Material</h1>

        {/* Formulario para agregar o modificar productos */}
        <div className="form-producto">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre del Material</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Color</span>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Stock</span>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Peso (kg)</span>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Proveedor</span>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Categoria</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="form-control"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </div>
          <div className="form-btn-info">
            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              {idMaterial !== null ? "Modificar" : "Agregar"} Material
            </button>
            {notModify && <p className="text-danger">El proveedor o la categoria no existen para el insumo.</p>}
          </div>
        </div>


        <div className="search-container">
          <label><h6>Buscar Material</h6></label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="btn-filter--supplier">
          <button
            className="btn btn-success"
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
        <h2>Lista de Material</h2>

        {listMaterials ? (
          <table className="table table-striped">
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
                  <td>{item.categoria ? item.categoria : item.categoria_insumos_id}</td>
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
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setIdMaterial(item.id);
                        setIsOpenModal(true);
                      }}
                      className="btn btn-danger"
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
