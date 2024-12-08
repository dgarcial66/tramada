import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import { Modal } from "../Modal/Modal.jsx";
import { Header } from "../Header/Header";
import { handleDelete } from "../../utils/utilsSuppliers.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./suppliers.css"; // Importa el archivo CSS para la sección de Suppliers

export function Suppliers({ user, setUser}) {
  const [ name, setName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ email, setEmail] = useState("");
  const [ id, setId ] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit ] = useState(false);
  const [ createSupplier, setCreateSupplier ] = useState(false);
  const [ text, setText ] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [ listSuppliers, setListSuppliers ] = useState([]);
  const { 
    suppliers,
    setSuppliers,
    search,
    setSearch,
    filteredSuppliers,
    supplierCreate,
    supplierUpdate,
    supplierDelete,
    formatInputs
  } = useSuppliers();
  const navigate = useNavigate();

  useEffect(() => {
    const result = filteredSuppliers();
    setListSuppliers(result);
  }, [suppliers,search])

  console.log(editIndex);
  console.log(listSuppliers);
  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = {
      nombre_proveedor: name,
      telefono: Number(phone),
      direccion: address,
      correo: email,
    };

    const validated = (newSupplier.nombre_proveedor && newSupplier.telefono && newSupplier.direccion);

    console.log(validated);
  if (validated) {
    console.log("ROSADITO");
    if (editIndex !== null) {
      console.log('AQUI ESTOY');
      // Modificar un proveedor existente
      const newList = [...listSuppliers];
      newList[editIndex] = newSupplier;
      console.log(newList);
      await supplierUpdate(newSupplier, id);
      setListSuppliers(newList);
      setIsOpen(true);
      setText('Actualizado');
      setTextModal('Actualizado');
      setCreateSupplier(true);
      formatInputs({
        setName,
        setPhone,
        setAddress,
        setEmail,
        setId,
        setEditIndex
      })
    } else {
      // Agregar nuevo proveedor
      const body = Object.values(newSupplier);
      const newList = [...listSuppliers, newSupplier];
      const updateListSupplier = newList;
      console.log(updateListSupplier);
      console.log(body);
      await supplierCreate(body);
      setText('creado');
      setCreateSupplier(true);
      setTextModal('creado');
      setIsOpen(true);
      setListSuppliers(updateListSupplier)
      formatInputs({
        setName,
        setPhone,
        setAddress,
        setEmail,
        setId,
        setEditIndex
      })
    }   
  }
}
  const handleRemove = async (id) => {
    const index = listSuppliers.findIndex(supplier => supplier.id === id);
    setId(id);
    setEditIndex(index);
    console.log(index);
    try {
      const {res, newList} = await handleDelete({
        id,
        index: editIndex,
        list: listSuppliers,
        service: supplierDelete,
    })
    if(res.status === 500) {
      return;
    }
    console.log("YO SOY REAL HASTA LA MUERTE: ",res, newList);
    setListSuppliers(newList);
    setText("eliminado");
    setCreateSupplier(true);
    setTextModal("eliminado");
    setIsOpen(true);
    if(res) {
      console.log(id);
      console.log('RESTOOOOOOO');
      return;
    }
    console.log('MUCHOOOOOOOOOOOOOO');
    } catch (error) {
      console.log(error);
    }finally{
      setId(null);
      setEditIndex(null);
    }
  }
  return (
    <>
      <Header user={user} setUser={setUser}/>
      <button className="button-back" onClick={() => navigate('/home')} /> 
        
        <div className="card text-center">
              <div className="card-header">
                GESTION PROVEEDORES
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre </span>
                    <input type="text"
                        value={name}
                        onChange={(e)=>{
                          setName(e.target.value);
                        }} 
                    className="form-control"  placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Telefono </span>
                    <input type="number"
                        value={phone}
                        onChange={(e)=>{
                          setPhone(e.target.value);
                        }} 
                    className="form-control" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Direccion </span>
                    <input type="text"
                        value={address}
                        onChange={(e)=>{
                          setAddress(e.target.value);
                        }} 
                    className="form-control" placeholder="direccion" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email del Proveedor</span>
                    <input type="text"
                        value={email}
                        onChange={(e)=>{
                          setEmail(e.target.value);
                        }} 
                    className="form-control" placeholder="Email del Proveedor" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>        
              </div>
              <div className="card-footer text-body-secondary">
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
                {
                  edit?
                  <div>
                  <button
                  onClick={(e) => handleSubmit(e)}
                    className="btn btn-warning m-2" 
                  >Actualizar</button>
                  <button
                  onClick={() => {
                    setEdit(false);
                    setCreateSupplier(false);
                  }}
                    className="btn btn-danger m-2" 
                  >Cancelar</button>
                 </div>
                 :<button
                    className="btn btn-success"
                    onClick={(e) => handleSubmit(e)} 
                  >Registrar</button>
                }
                {
                  createSupplier ? <p>Proveedor {text}</p> : <p>No realizo ninguna operacion hasta el momento.</p>
                }
            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Correo</th>
              </tr>
            </thead>
        <tbody>
        {
          listSuppliers?.map((i, index)=>{
            return  <tr key={i.id}>
                      <th>{i.id}</th>
                      <td>{i.nombre_proveedor}</td>
                      <td>{i.telefono}</td>
                      <td>{i.direccion}</td>
                      <td>{i.correo ? i.correo : 'No registrado'}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                          className="btn btn-info"
                          onClick={() => {
                            setEditIndex(index);
                            setId(i.id);
                            setEdit(true);
                            setName(i.nombre_proveedor);
                            setPhone(i.telefono);
                            setAddress(i.direccion);
                            setEmail(i.correo);
                          }}
                        >Editar</button>
                        <button 
                          onClick={()=> handleRemove(i.id) }
                          className="btn btn-danger"
                        >Eliminar</button>
                      </div>
                      </td>
                      <td></td>
                    </tr> 
          })
        }
        </tbody>

          </table>  
              
              </div>
        </div>  
        <Modal
          isOpen={isOpen}
          textModal={textModal}
          setIsOpen={setIsOpen}
          textInfo={'proveedor'}
        />

    </>
  );
}
