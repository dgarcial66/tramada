import { ApiSupplier } from "../services/apiSupplier";

const service = new ApiSupplier();

async function deleted(id) {
  try {
    const res = await service.suppliesDelete(id);
    console.log("QUIEN SOY AQUI", res);
    return res;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export { deleted };
