import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormRegister } from "../FormRegister/FormRegister.jsx";
import { handleEdit } from '../../utils/utils.js'
import { handleDelete } from '../../utils/utils.js'
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
      name={name}
      price={price}
      editIndex={editIndex}
      search={search}
      filteredProducts={filteredProducts}
      setName={setName}
      setPrice={setPrice}
      setEditIndex={setEditIndex}
      setSearch={setSearch}
      handleEdit={() => handleEdit(products)}
      handleDelete={handleDelete}
      textButton={'Producto'}
      user={user}
      setUser={setUser}
    />
  </>
  );
}