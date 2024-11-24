import { ApiRawMaterials } from "../services/apiRawMaterials";

async function updateMaterial(body, id) {
  const service = new ApiRawMaterials();

  const rta = await service.updateMaterial(body, id);
  return rta.json();
}

export { updateMaterial };
