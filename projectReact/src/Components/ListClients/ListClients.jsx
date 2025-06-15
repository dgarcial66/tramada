/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// eslint-disable-next-line react/prop-types
export function ListClients({ user, setUser }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("");
  const [tclient, setTclient] = useState("");
  const [clientsList, setClientList] = useState([]);
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const paymentOptions = ["Efectivo", "Transferencia Bancaria"];
  const opcionesCliente = ["Regular", "VIP", "Mayorista", "Minorista"];


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
    Axios.post(`${API_URL}/api/v1/clients`, {
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

    Axios.put(`${API_URL}/api/v1/clients`, {
      id: id,
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
    Axios.delete(`${API_URL}/api/v1/clients/${id}`)
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



  const getClient = () => {
    Axios.get(`${API_URL}/api/v1/clients`).then((response) => {
      setClientList(response.data);
    })
  }




  const navigate = useNavigate()

  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    } else {
      getClient();
    }
  }, [user, navigate])


  return (
    <>
      <section className="container-father-services" id="container-father-services">
        <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
        <div className="container">
          <div className="card">
            <div className="card-header">
              GESTIÓN CLIENTES
            </div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-label">Nombre</span>
                <input type="text" value={nombre}
                  onChange={(event) => { setNombre(event.target.value) }}
                  className="input-field" placeholder="Nombre" />
              </div>
              <div className="input-group">
                <span className="input-label">Teléfono</span>
                <input type="number" value={telefono}
                  onChange={(event) => { setTelefono(event.target.value) }}
                  className="input-field" placeholder="Teléfono" />
              </div>
              <div className="input-group">
                <span className="input-label">Dirección</span>
                <input type="text" value={direccion}
                  onChange={(event) => { setDireccion(event.target.value) }}
                  className="input-field" placeholder="Dirección" />
              </div>

              <div className="input-group">
              <span className="input-label">Tipo de pago</span>
              <select 
                value={pago}
                onChange={(event) => { setPago(event.target.value) }}
                className="input-field"
              >
                {/* aqui esta el select para el tipo de pago  */}
                <option value="">Seleccione un tipo de pago</option>
                {paymentOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <span className="input-label">Tipo</span>
              <select 
                value={tclient}
                onChange={(event) => { setTclient(event.target.value) }}
                className="input-field"
                required
              >
                <option value="">Seleccione tipo de cliente</option>
                {opcionesCliente.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="card-footer">
              {
                editar ?
                  <div>
                    <button className="btn btn-update" onClick={updateClient}>Actualizar</button>
                    <button className="btn btn-cancel" onClick={clean}>Cancelar</button>
                  </div>
                  : <button className="btn btn-register" onClick={addClient}>Registrar</button>
              }
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Tipo de pago</th>
                <th>Tipo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                clientsList?.map((val) => (
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.nombre_cliente}</td>
                    <td>{val.telefono_cliente}</td>
                    <td>{val.direccion_cliente}</td>
                    <td>{val.tipo_pago}</td>
                    <td>{val.tipo_cliente}</td>
                    <td>
                      <div className="group-btn">
                        <button onClick={() => editClient(val)} className="btn btn-edit">Editar</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </section>



    </>
  );
}