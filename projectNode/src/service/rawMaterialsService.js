const { RawMaterialsModel } = require("../models/rawMaterialsModel.js");

const model = new RawMaterialsModel();

class RawMaterialsService {
  constructor() {}

  async getRawMaterials() {
    try {
      const data = await model.getMaterials();
      console.log("SOY DATA SERVICE: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createRawMaterials(body) {
    try {
      const data = await model.create(body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateRaw(id, body) {
    try {
      const { nombre_proveedor, nombre_categoria_insumo } = body;
      delete body.nombre_proveedor;
      delete body.nombre_categoria_insumo;
      console.log("SOY BODY EN OTRA MALDITA PARTE: ", body);

      const data = await model.update(
        id,
        body,
        nombre_proveedor,
        nombre_categoria_insumo
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deductMaterial(id, quantities) {
    try {
      const data = await model.deduct(id, quantities);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { RawMaterialsService };
