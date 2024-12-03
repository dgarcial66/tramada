import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./suppliers.css"; // Importa el archivo CSS para la sección de Suppliers

export function Suppliers() {
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [codigoProveedor, setCodigoProveedor] = useState("");
  const [telefonoProveedor, setTelefonoProveedor] = useState("");
  const [direccionProveedor, setDireccionProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit ] = useState(false);
  const [ listSuppliers, setListSuppliers ] = useState([]);
  const { 
    suppliers,
    setSuppliers,
    search,
    setSearch,
    filteredSuppliers
  } = useSuppliers();
  const navigate = useNavigate();

  useEffect(() => {
    const result = filteredSuppliers();
    setListSuppliers(result);
  }, [suppliers,search])

  console.log(listSuppliers);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupplier = {
      nombreProveedor,
      codigoProveedor,
      telefonoProveedor,
      direccionProveedor,
      emailProveedor,
    };
    if (editIndex !== null) {
      // Modificar un proveedor existente
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editIndex] = newSupplier;
      setSuppliers(updatedSuppliers);
      setEditIndex(null);
    } else {
      // Agregar nuevo proveedor
      setSuppliers([...suppliers, newSupplier]);
    }
    // Limpiar los campos
    setNombreProveedor("");
    setCodigoProveedor("");
    setTelefonoProveedor("");
    setDireccionProveedor("");
    setEmailProveedor("");
  };

  console.log(search);

  return (
    <>
      <Header />
      <button className="button-back" onClick={() => navigate('/home')} /> 
        
        <div className="card text-center">
              <div className="card-header">
                GESTION CLIENTES
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre </span>
                    <input type="text" 
                        onChange={(event)=>{
                        
                        }} 
                    className="form-control"  placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Telefono </span>
                    <input type="number" 
                        onChange={(event)=>{
                        
                        }} 
                    className="form-control" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Direccion </span>
                    <input type="text" 
                        onChange={(event)=>{
                        
                        }} 
                    className="form-control" placeholder="direccion" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Código del Proveedor</span>
                    <input type="number" 
                        onChange={(event)=>{
                        
                        }} 
                    className="form-control" placeholder="Código del Proveedor" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email del Proveedor</span>
                    <input type="text" 
                        onChange={(event)=>{
                          
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
                 <button  className="btn btn-warning m-2" >Actualizar</button>
                 <button  className="btn btn-danger m-2" >Cancelar</button>
                 </div>
                 :<button  className="btn btn-success" >Registrar</button>
                }

            <table className="table table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Código del Proveedor</th>
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
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                        onClick={()=>{
                          setEditIndex(index);
                        }}
                        className="btn btn-info">Editar</button>
                        <button type="button" 
                        onClick={()=>{
                          deleteClient(val.id);
                        }}
                        className="btn btn-danger ">Eliminar</button>
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

    </>
  );
}
