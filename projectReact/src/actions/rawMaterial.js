import { ApiRawMaterials } from "../services/apiRawMaterials";

async function updateMaterial(body, id) {
  const service = new ApiRawMaterials();

  await service.updateMaterial(body, id);
}

export { updateMaterial };
