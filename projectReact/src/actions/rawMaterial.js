import { ApiRawMaterials } from "../services/apiRawMaterials";

const service = new ApiRawMaterials();

async function updateMaterial(body, id) {
  const rta = await service.updateMaterial(body, id);
  return rta.json();
}

async function createMaterial(body) {
  const rta = await service.createRawMaterials(body);
  return rta.json();
}

async function deleteMaterial(id) {
  const rta = await service.deleteMaterial(id);
  return rta.json();
}

export { updateMaterial, deleteMaterial, createMaterial };
