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
      const data = await model.update(id, body);
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
