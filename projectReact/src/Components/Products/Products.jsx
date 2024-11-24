import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./productos.css"; // Importamos el archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";

export function Products({user, setUser}) {
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
      Axios.post("http://localhost:3000/api/v1/products", {
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

      Axios.put("http://localhost:3000/api/v1/products", {
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



  const getProducts = () =>{
    Axios.get("http://localhost:3000/api/v1/products"). then((response) =>{
      console.log(response.data);
      setProductsList(response.data);
    })
  }  

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3000/api/v1/products/${id}`) 
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
    if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    }else{
      getProducts();
    }
  }, [user, navigate])



  return (
    <>
    <div className="container"> 
      <div className="card text-center">
        <div className="card-header">
          GESTION PRODUCTOS
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" >Nombre </span>
                    <input type="text" value={nombre}
                    onChange={(event)=>{
                    setNombre(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese nombre del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Genero </span>
                    <input type="text" value={genero}
                    onChange={(event)=>{
                    setGenero(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese el genero del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tipo </span>
                    <input type="text" value={tipo}
                    onChange={(event)=>{
                    setTipo(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese el tipo de producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Talla </span>
                    <input type="text" value={talla}
                    onChange={(event)=>{
                    setTalla(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese la talla del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Color </span>
                    <input type="text" value={color}
                    onChange={(event)=>{
                    setColor(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese el color del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Peso </span>
                    <input type="text" value={peso}
                    onChange={(event)=>{
                    setPeso(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese peso del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Cantidad </span>
                    <input type="text" value={cantidad}
                    onChange={(event)=>{
                    setCantidad(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese la cantidad de prodcuto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Precio </span>
                    <input type="text" value={precio}
                    onChange={(event)=>{
                    setPrecio(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese el precio del producto" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Categoria </span>
                    <input type="text" value={categoria}
                    onChange={(event)=>{
                    setCategoria(event.target.value)  
                    }}
                    className="form-control"  placeholder="Ingrese la categoria a la que pertenece" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Fecha actualizacion</span>
                    <input type="datetime-local" value={fecha}
                    onChange={(event)=>{
                    setFecha(event.target.value)  
                    }}
                    className="form-control"  placeholder="Fecha actualizacion" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
                 <button className="btn btn-warning m-2" onClick={()=>navigate('/OrdenProduccion')}>Orden de produccion</button>   
                 {
                  editar?
                  <div>
                 <button  className="btn btn-warning m-2" onClick={updateProducts}>Actualizar</button>
                 <button  className="btn btn-danger m-2" onClick={clean}>Cancelar</button>
                 </div>
                 :<button  className="btn btn-success" onClick={addProducts}>Registrar</button>
                }
              </div>
           </div>
           <table className="table table-striped">
           <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Genero</th>
            <th scope="col">Tipo</th>
            <th scope="col">Talla</th>
            <th scope="col">Color</th>
            <th scope="col">Peso</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Categoria</th>
            <th scope="col">Fecha</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
        {
          productslist.map((val, key)=>{
            return  <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre_producto}</td>
                      <td>{val.genero_producto}</td>
                      <td>{val.tipo_producto}</td>
                      <td>{val.talla_producto}</td>
                      <td>{val.color_producto}</td>
                      <td>{val.peso_producto}</td>
                      <td>{val.cantidad_producto}</td>
                      <td>{val.precio_producto}</td>
                      <td>{val.categoria_productos_id}</td>
                      <td>{val.fecha_actualizacion}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-info"
                         onClick={()=>{
                          editProduct(val);
                        }}
                        >Editar</button>
                        <button type="button" className="btn btn-danger"
                        onClick={()=>{
                         deleteProduct(val.id);
                        }}
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
  </>
  );
}