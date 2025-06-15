/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";
import fondoProductos from "../../../asset/img/fondo_productos.jpeg"

const API_URL = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
export function Products({ user, setUser }) {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("");
  const [talla, setTalla] = useState("");
  const [color, setColor] = useState("");
  const [peso, setPeso] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [productslist, setProductsList] = useState([]);
  const [editar, setEditar] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate()

  const clean = () => {
    setNombre("");
    setGenero("");
    setTipo("");
    setTalla("");
    setColor("");
    setPeso("");
    setCantidad("");
    setPrecio("");
    setCategoria("");
    setFecha("");
    setEditar(false);
  }

  const addProducts = () => {

    if (!nombre || !genero || !tipo || !talla || !color || !peso || !cantidad || !precio || !categoria || !fecha) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos antes de registrar.",
      });
      return;
    }
    Axios.post(`${API_URL}/api/v1/products`, {
      nombre_producto: nombre,
      genero_producto: genero,
      tipo_producto: tipo,
      talla_producto: talla,
      color_producto: color,
      peso_producto: peso,
      cantidad_producto: cantidad,
      precio_producto: precio,
      categoria_productos_id: categoria,
      fecha_actualizacion: fecha,
    })
      .then(() => {
        getProducts();
        clean();
        Swal.fire({
          icon: "success",
          title: "Produto registrado",
          text: "El Producto ha sido registrado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al registrar producto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al registrar el producto. Inténtalo de nuevo.",
        });
      });
  };

  const editProduct = (val) => {
    setEditar(true);

    setNombre(val.nombre_producto);
    setGenero(val.genero_producto);
    setTipo(val.tipo_producto);
    setTalla(val.talla_producto);
    setColor(val.color_producto);
    setPeso(val.peso_producto);
    setCantidad(val.cantidad_producto);
    setPrecio(val.precio_producto);
    setCategoria(val.categoria_productos_id);
    setFecha(val.fecha_actualizacion);
    setId(val.id);
  };

  const updateProducts = () => {

    Axios.put(`${API_URL}/api/v1/products`, {
      id: id,
      nombre_producto: nombre,
      genero_producto: genero,
      tipo_producto: tipo,
      talla_producto: talla,
      color_producto: color,
      peso_producto: peso,
      cantidad_producto: cantidad,
      precio_producto: precio,
      categoria_productos_id: categoria,
      fecha_actualizacion: fecha
    })
      .then(() => {
        getProducts();
        clean();
        Swal.fire({
          icon: "success",
          title: "Produto actualizado",
          text: "El Producto ha sido actualizado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al actualizar producto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al actualizar el producto. Inténtalo de nuevo.",
        });
      });
  };



  const getProducts = () => {
    Axios.get(`${API_URL}/api/v1/products`).then((response) => {
      console.log(response.data);
      setProductsList(response.data);
    })
  }

  const deleteProducts = (id) => {
    Axios.delete(`${API_URL}/api/v1/products/${id}`)
      .then(() => {
        getProducts();
        clean();
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          text: "El Producto ha sido eliminado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar el producto. Inténtalo de nuevo.",
        });
      });
  };


  useEffect(() => {
    if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    } else {
      getProducts();
      getCategorias();
    }
  }, [user, navigate])


// aqui se hace el llamado a la api para obtener las categorias
  const getCategorias = () => {
    return Axios.get(`${API_URL}/api/v1/products/product-categories`)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error completo:", error);
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "No se pudieron cargar las categorías",
        });
      });
  };






  return (
    <>
      <section className="container-father-services" style={{backgroundImage:`url(${fondoProductos})`}}>
        <Header user={user} setUser={setUser} />
        <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
        <div className="container">
          <div className="card ">
            <div className="card-header">
              GESTIÓN PRODUCTOS
            </div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Nombre </span>
                <input type="text" value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value)
                  }}
                  className="input-field" placeholder="Ingrese nombre del producto" aria-label="Username" aria-describedby="basic-addon1" />
              </div>


              {/*select para el genero del producto  */}
              <div className="input-group">
            <span className="input-label" id="basic-addon1">Género </span>
            <select
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            className="input-field"
            aria-label="Género"
             >
            <option value="">Selecciona un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Unisex">Unisex</option>
            <option value="Infantil">Infantil</option>
            </select>
            </div>


                    {/*select para el tipo de producto*/ }
                    <div className="input-group">
                    <span className="input-label" id="basic-addon1">Tipo </span>
                    <select
                    value={tipo}
                    onChange={(event) => setTipo(event.target.value)}
                    className="input-field"
                    aria-label="Tipo de producto"
                    >
                  <option value="" disabled>Seleccione el tipo de producto</option>
                  <option value="Camiseta">Camiseta</option>
                  <option value="Camisa">Camisa</option>
                  <option value="Pantalón">Pantalón</option>
                  <option value="Sudadera">Sudadera</option>
                  <option value="Vestido">Vestido</option>
                  <option value="Falda">Falda</option>
                  <option value="Chaqueta">Chaqueta</option>
                  <option value="Blusa">Blusa</option>
                  <option value="Short">Short</option>
                  <option value="Ropa interior">Ropa interior</option>
                  <option value="Ropa deportiva">Ropa deportiva</option>
                  <option value="Ropa de dormir">Ropa de dormir</option>
                  <option value="Bufanda">Bufanda</option>
                  <option value="Abrigo">Abrigo</option>
                  <option value="Ropa infantil">Ropa infantil</option>
                  <option value="Accesorios textiles">Accesorios textiles</option>
                </select>
              </div>


              {/*select para la talla de la ropa */ }
              <div className="input-group">
              <span className="input-label" id="basic-addon1">Talla</span>
              <select
                value={talla}
                onChange={(event) => setTalla(event.target.value)}
                className="input-field"
                aria-label="Talla del producto"
              >
                <option value="" disabled>Seleccione la talla</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

              <div className="input-group">
                <span className="input-label" id="basic-addon1">Color </span>
                <input type="text" value={color}
                  onChange={(event) => {
                    setColor(event.target.value)
                  }}
                  className="input-field" placeholder="Ingrese el color del producto" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Peso Kg</span>
                <input type="text" value={peso}
                  onChange={(event) => {
                    setPeso(event.target.value)
                  }}
                  className="input-field" placeholder="Ingrese peso del producto" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Cantidad </span>
                <input type="text" value={cantidad}
                  onChange={(event) => {
                    setCantidad(event.target.value)
                  }}
                  className="input-field" placeholder="Ingrese la cantidad de prodcuto" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group">
                <span className="input-label" id="basic-addon1">Precio (COP)</span>
                <input type="text" value={precio}
                  onChange={(event) => {
                    setPrecio(event.target.value)
                  }}
                  className="input-field" placeholder="Ingrese el precio del producto" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              
              
              {/* Este es el select para categorias */}
              <div className="input-group">
              <span className="input-label">Categoría:</span>
              <select
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                className="input-field"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.id} - {cat.nombre_categoria.trim()} 
                  </option>
                ))}
              </select>
            </div>


              <div className="input-group">
                <span className="input-label" id="basic-addon1">Fecha actualización</span>
                <input type="datetime-local" value={fecha}
                  onChange={(event) => {
                    setFecha(event.target.value)
                  }}
                  className="input-field" placeholder="Fecha actualización" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-update" onClick={() => navigate('/OrdenProduccion')}>Orden de producción</button>
              {
                editar ?
                  <div>
                    <button className="btn btn-update" onClick={updateProducts}>Actualizar</button>
                    <button className="btn btn-cancel" onClick={clean}>Cancelar</button>
                  </div>
                  : <button className="btn btn-register" onClick={addProducts}>Registrar</button>
              }
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Genero</th>
                <th scope="col">Tipo</th>
                <th scope="col">Talla</th>
                <th scope="col">Color</th>
                <th scope="col">Peso(Kg)</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio(COP)</th>
                <th scope="col">Categoría</th>
                <th scope="col">Fecha</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                productslist.map((val, key) => {
                  return <tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.nombre_producto}</td>
                    <td>{val.genero_producto}</td>
                    <td>{val.tipo_producto}</td>
                    <td>{val.talla_producto}</td>
                    <td>{val.color_producto}</td>
                    <td>{val.peso_producto}</td>
                    <td>{val.cantidad_producto}</td>
                    <td>{val.precio_producto}</td>
                    <td>
                        {categorias.find(cat => cat.id === val.categoria_productos_id)?.nombre_categoria || val.categoria_productos_id}
                      </td>


                    <td>{val.fecha_actualizacion}</td>
                    <td>
                      <div className="group-btn" role="group" aria-label="Basic example">
                        <button type="button" className="btn-edit"
                          onClick={() => {
                            editProduct(val);
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


    </>
  );
}