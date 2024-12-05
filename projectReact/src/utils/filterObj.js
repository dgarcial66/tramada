function filterObj(id, listObj) {
  const index = listObj.findIndex((i) => i.id === id);
  if (index !== -1) {
    return listObj[index];
  }
  return;
}

export { filterObj };
