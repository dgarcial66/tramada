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
      throw new Error(error);
    }
  }

  async updateRaw(body, id) {
    try {
      const data = await model.update(body, id);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMaterial(id) {
    try {
      const data = await model.delete(id);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { RawMaterialsService };
