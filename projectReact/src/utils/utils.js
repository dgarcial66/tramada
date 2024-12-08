export const handleEdit = async ({
  products,
  clients,
  index,
  setName,
  setCode,
  setStock,
  setWeight,
  setEditIndex,
  setAddress,
  setNumberPhone,
  setCo,
  materials,
  setColor,
  setPrice,
  setVendor,
  setCategory,
}) => {
  console.log(products);
  console.log(clients);

  if (products) {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setCode(product.code);
    setStock(product.stock);
    setCategory(product.category);
    setWeight(product.weight);
    setEditIndex(index);
  } else if (clients) {
    const client = clients[index];
    setName(client.name);
    setAddress(client.address);
    setNumberPhone(client.numberPhone);
    setCo(client.co);
    setEditIndex(index);
  } else {
    const material = await materials[index];
    console.log(material);
    if (material) {
      setName(material.nombre_insumo);
      setColor(material.color_insumo);
      setStock(material.cantidad_insumo);
      setWeight(material.peso_insumo);
      setPrice(material.precio_insumo),
        setVendor(material.proveedor),
        setCategory(material.categoria);
    }
  }
};

export const handleDelete = ({ id, setId }) => {
  setId(id);
};

export const formatValues = ({
  setName,
  setColor,
  setStock,
  setWeight,
  setPrice,
  setVendor,
  setCategory,
  setIdMaterial,
}) => {
  setName("");
  setColor("");
  setStock("");
  setWeight("");
  setPrice("");
  setVendor("");
  setCategory("");
  setIdMaterial(null);
};
