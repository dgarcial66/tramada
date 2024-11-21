export const handleEdit = ({
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
  setTypeMaterial,
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
    const material = materials[index];
    console.log(material);
    setName(material.nombre_insumo);
    setTypeMaterial(material.tipo_insumo);
    setColor(material.color_insumo);
    setStock(material.cantidad_insumo);
    setWeight(material.peso_insumo);
    setPrice(material.precio_insumo),
      setVendor(material.proveedor),
      setCategory(material.categoria);
  }
};

export const handleDelete = ({
  products,
  clients,
  materials,
  index,
  setProducts,
  setClients,
  setMaterials,
}) => {
  if (products) {
    setProducts(products.filter((_, i) => i !== index));
  } else if (clients) {
    setClients(clients.filter((_, i) => i !== index));
  } else {
    setMaterials(materials.filter((_, i) => i !== index));
  }
};
