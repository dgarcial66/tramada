export const handleEdit = ({ products, index }) => {
  const product = products[index];
  setName(product.name);
  setPrice(product.price);
  setCode(product.code);
  setStock(product.stock);
  setCategory(product.category);
  setWeight(product.weight);
  setEditIndex(index);
};

export const handleDelete = (index) => {
  setProducts(products.filter((_, i) => i !== index));
};
