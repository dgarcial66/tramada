import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";

export function ListClients({user, setUser}) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [pago, setPago] = useState("");  
    const [tclient, setTclient] = useState("");
    const [clientsList, setClientList] = useState([]);
    const [id, setId] = useState("");
    const [editar, setEditar] = useState(false);


    const clean = () => {
      setNombre("");
      setTelefono("");
      setDireccion("");
      setPago("");
      setTclient("");
      setEditar(false);
    }

    const addClient = () => {

      if (!nombre || !telefono || !direccion || !pago || !tclient) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, llena todos los campos antes de registrar.",
        });
        return; 
      }
        Axios.post("http://localhost:3000/api/v1/clients", {
          nombre_cliente: nombre,
          telefono_cliente: telefono,
          direccion_cliente: direccion,
          tipo_pago: pago,
          tipo_cliente: tclient,
        })
          .then(() => {
            getClient();
            clean();
            Swal.fire({
              icon: "success",
              title: "Cliente registrado",
              text: "El cliente ha sido registrado correctamente.",
            });
          })
          .catch((error) => {
            console.error("Error al registrar cliente:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al registrar el cliente. Inténtalo de nuevo.",
            });
          });
      };

      const editClient = (val) => {
        setEditar(true);
      
        setNombre(val.nombre_cliente);
        setTelefono(val.telefono_cliente);
        setDireccion(val.direccion_cliente);
        setPago(val.tipo_pago);
        setTclient(val.tipo_cliente);
        setId(val.id); 
      };
      
      const updateClient = () => {

        Axios.put("http://localhost:3000/api/v1/clients", {
          id: id, 
          nombre_cliente: nombre,
          telefono_cliente: telefono,
          direccion_cliente: direccion,
          tipo_pago: pago,
          tipo_cliente: tclient,
        })
          .then(() => {
            getClient();
            clean(); // Actualiza la lista de clientes     
            Swal.fire({
              icon: "success",
              title: "Cliente actualizado",
              text: "El cliente ha sido actualizado correctamente.",
            });
          })
          .catch((error) => {
            console.error("Error al actualizar cliente:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al actualizar el cliente. Inténtalo de nuevo.",
            });
          });
      };

      const deleteClient = (id) => {
        Axios.delete(`http://localhost:3000/api/v1/clients/${id}`) 
          .then(() => {
            getClient();
            clean(); 
            Swal.fire({
              icon: "success",
              title: "Cliente eliminado",
              text: "El cliente ha sido eliminado correctamente.",
            });
          })
          .catch((error) => {
            console.error("Error al eliminar cliente:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al eliminar el cliente. Inténtalo de nuevo.",
            });
          });
      };



    const getClient = () =>{
      Axios.get("http://localhost:3000/api/v1/clients"). then((response) =>{
        setClientList(response.data);
      })
    }  
    



    const navigate = useNavigate()

    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
          navigate('/')
        }else{
          getClient();
        }
    }, [user, navigate])
    

    return(

      <div className="container">
       
         
            <div className="card text-center">
              <div className="card-header">
                GESTION CLIENTES
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre </span>
                    <input type="text" value={nombre}
                        onChange={(event)=>{
                        setNombre(event.target.value)
                        }} 
                    className="form-control"  placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Telefono </span>
                    <input type="number" value={telefono}
                        onChange={(event)=>{
                        setTelefono(event.target.value)
                        }} 
                    className="form-control" placeholder="number" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Direccion </span>
                    <input type="text" value={direccion}
                        onChange={(event)=>{
                        setDireccion(event.target.value)
                        }} 
                    className="form-control" placeholder="direccion" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tipo de pago </span>
                    <input type="number" value={pago}
                        onChange={(event)=>{
                        setPago(event.target.value)
                        }} 
                    className="form-control" placeholder="tipo de pago" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tipo cliente </span>
                    <input type="text" value={tclient}
                        onChange={(event)=>{
                        setTclient(event.target.value)
                        }} 
                    className="form-control" placeholder="tipo cliente" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>        
              </div>
              <div className="card-footer text-body-secondary">
                {
                  editar?
                  <div>
                 <button  className="btn btn-warning m-2" onClick={updateClient}>Actualizar</button>
                 <button  className="btn btn-danger m-2" onClick={clean}>Cancelar</button>
                 </div>
                 :<button  className="btn btn-success" onClick={addClient}>Registrar</button>
                }
              
              </div>
        </div>  
           <table className="table table-striped">
           <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Direccion</th>
            <th scope="col">Tipo de pago</th>
            <th scope="col">Tipo de cliente</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
        {
          clientsList.map((val, key)=>{
            return  <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre_cliente}</td>
                      <td>{val.telefono_cliente}</td>
                      <td>{val.direccion_cliente}</td>
                      <td>{val.tipo_pago}</td>
                      <td>{val.tipo_cliente}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                        onClick={()=>{
                          editClient(val);
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
    );
}