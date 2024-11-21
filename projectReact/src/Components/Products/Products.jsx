import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormRegister } from "../FormRegister/FormRegister.jsx";
import { handleEdit, handleDelete } from '../../utils/utils.js'
import "./productos.css"; // Importamos el archivo CSS

export function Products({user, setUser}) {
  const [products, setProducts] = useState([]); 
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [search, setSearch] = useState("");
  const [code, setCode] = useState(""); 
  const [stock, setStock] = useState(""); 
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    }
  }, [user, navigate])
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, code, stock, category, weight };

    if (editIndex !== null) {
      
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      
      setProducts([...products, newProduct]);
    }
    setName("");
    setPrice("");
    setCode("");
    setStock("");
    setCategory("");
    setWeight("");
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <FormRegister 
      handleSubmit={handleSubmit} 
      name={name} // linea para quitar al realizar restructuracion.
      price={price} // linea para quitar al realizar restructuracion.
      editIndex={editIndex} // linea para quitar al realizar restructuracion.
      search={search} // linea para quitar al realizar restructuracion.
      filteredProducts={filteredProducts}
      setName={setName} // linea para quitar al realizar restructuracion.
      setPrice={setPrice} // linea para quitar al realizar restructuracion.
      setEditIndex={setEditIndex} // linea para quitar al realizar restructuracion.
      setSearch={setSearch} // linea para quitar al realizar restructuracion.
      setCode={setCode} // linea para quitar al realizar restructuracion.
      setStock={setStock} // linea para quitar al realizar restructuracion.
      setCategory={setCategory} // linea para quitar al realizar restructuracion.
      setWeight={setWeight} // linea para quitar al realizar restructuracion.
      handleEdit={(products) => handleEdit(products)} // linea para quitar al realizar restructuracion.
      handleDelete={handleDelete}
      textButton={'Producto'}
      user={user}
      setUser={setUser}
      products={products} // linea para quitar al realizar restructuracion.
      setProducts={setProducts} // linea para quitar al realizar restructuracion.
    />
  </>
  );
}