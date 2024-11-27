import { ApiRawMaterials } from "../services/apiRawMaterials";

async function handlerUpdateItem(id, body) {
  const service = new ApiRawMaterials();

  const res = await service.deductMaterial(id, body);
}

export { handlerUpdateItem };
