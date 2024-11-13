export const handleEdit = ({
  products,
  clients,
  index,
  setName,
  setPrice,
  setCode,
  setStock,
  setCategory,
  setWeight,
  setEditIndex,
  setAddress,
  setNumberPhone,
  setCo,
  materials,
  setTypeMaterial,
  setColor,
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
    console.log(materials);
    const material = materials[index];
    setName(material.name);
    setTypeMaterial(material.typeMaterial);
    setColor(material.color);
    setStock(material.stock);
    setWeight(material.weight);
    setEditIndex(index);
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
