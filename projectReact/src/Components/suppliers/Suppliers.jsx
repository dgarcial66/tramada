import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import { Modal } from "../Modal/Modal.jsx";
import Swal from 'sweetalert2';
import { Header } from "../Header/Header";
import { handleDelete } from "../../utils/utilsSuppliers.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./suppliers.css";

export function Suppliers({ user, setUser }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [createSupplier, setCreateSupplier] = useState(false);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [listSuppliers, setListSuppliers] = useState([]);
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
  }, [suppliers, search])

  console.log(editIndex);
  console.log(listSuppliers);
  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSupplier = {
      nombre_proveedor: name?.trim() || "",
      telefono: phone ? Number(phone) : null,
      direccion: address?.trim() || "",
      correo: email?.trim() || "",
    };

    const validated = (
      newSupplier.nombre_proveedor &&
      newSupplier.telefono &&
      newSupplier.direccion
    );

    if (!validated) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, completa nombre, teléfono y dirección del proveedor.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    if (editIndex !== null) {
      try {
        const newList = [...listSuppliers];
        newList[editIndex] = newSupplier;


        await supplierUpdate(newSupplier, id);
        setListSuppliers(newList);
        setText('Actualizado');
        setTextModal('Actualizado');
        setCreateSupplier(true);
        setIsOpen(true);


        Swal.fire({
          icon: 'success',
          title: 'Proveedor actualizado',
          text: 'El proveedor se ha actualizado correctamente.',
          confirmButtonColor: '#3085d6',
        });


        formatInputs({
          setName,
          setPhone,
          setAddress,
          setEmail,
          setId,
          setEditIndex,
        });
        setEdit(false);
      } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el proveedor.',
          confirmButtonColor: '#3085d6',
        });
      }
    } else {
      try {
        const body = Object.values(newSupplier);
        const newList = [...listSuppliers, newSupplier];
        await supplierCreate(body);
        setListSuppliers(newList);
        setText('Creado');
        setTextModal('Creado');
        setCreateSupplier(true);
        setIsOpen(true);

        Swal.fire({
          icon: 'success',
          title: 'Proveedor registrado',
          text: 'El proveedor se ha registrado correctamente.',
          confirmButtonColor: '#3085d6',
        });

        formatInputs({
          setName,
          setPhone,
          setAddress,
          setEmail,
          setId,
          setEditIndex,
        });
      } catch (error) {
        console.error("Error al registrar el proveedor:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el proveedor.',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  return (
    <>
      <section className="container-father-services">
        <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
        <div className="container">
          <div className="card">
            <div className="card-header">
              GESTIÓN PROVEEDORES
            </div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Nombre </span>
                <input type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="input-field" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Telefono </span>
                <input type="number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="input-field" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Direccion </span>
                <input type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="input-field" placeholder="direccion" aria-label="Username" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <span className="input-label" id="basic-addon1">Email del Proveedor</span>
                <input type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input-field" placeholder="Email del Proveedor" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="card-footer">
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
                edit ?
                  <div>
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="btn btn-update"
                    >Actualizar</button>
                    <button
                      onClick={() => {
                        setEdit(false);
                        formatInputs({
                          setName,
                          setPhone,
                          setAddress,
                          setEmail,
                          setId,
                          setEditIndex
                        });
                      }}
                      className="btn btn-cancel"
                    >
                      Cancelar
                    </button>

                  </div>
                  : <button
                    className="btn btn-register"
                    onClick={(e) => handleSubmit(e)}
                  >Registrar</button>
              }

            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Correo</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                listSuppliers?.map((i, index) => {
                  return <tr key={i.id}>
                    <th>{i.id}</th>
                    <td>{i.nombre_proveedor}</td>
                    <td>{i.telefono}</td>
                    <td>{i.direccion}</td>
                    <td>{i.correo ? i.correo : 'No registrado'}</td>
                    <td>
                      <div className="group-btn" role="group" aria-label="Basic example">
                        <button type="button"
                          className="btn btn-edit"
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
                      </div>
                    </td>
                  </tr>
                })
              }
            </tbody>

          </table>
        </div>

      </section>

      <Modal
        isOpen={isOpen}
        textModal={textModal}
        setIsOpen={setIsOpen}
        textInfo={'proveedor'}
      />

    </>
  );
}