function filterCategories(id, obj) {
  const categoryName = obj.findIndex((i) => i.id === id);
  if (categoryName < 0) {
    return;
  }
  return obj[categoryName].nombre_categoria_insumo;
}

export { filterCategories };
