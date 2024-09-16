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
  } else {
    const client = clients[index];
    setName(client.name);
    setAddress(client.address);
    setNumberPhone(client.numberPhone);
    setCo(client.co);
    setEditIndex(index);
  }
};

export const handleDelete = ({
  products,
  clients,
  index,
  setProducts,
  setClients,
}) => {
  if (products) {
    setProducts(products.filter((_, i) => i !== index));
  } else {
    setClients(clients.filter((_, i) => i !== index));
  }
};
