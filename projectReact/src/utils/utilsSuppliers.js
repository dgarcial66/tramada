async function handleDelete({ id, index, list, service }) {
  console.log(id);
  console.log(index);
  if (id === null) {
    console.error("No se puede eliminar: id o editIndex no están definidos.");
    return;
  }

  console.log("SOY LIST: ", list);
  const res = await service(id);
  if (res.status === 500) {
    const newList = [...list];
    return { res, newList };
  }
  const newList = list.filter((i) => i.id !== id);
  console.log(newList);
  return { res, newList };
}

export { handleDelete };
