const { RawMaterialsModel } = require("../models/rawMaterialsModel.js");

const model = new RawMaterialsModel();

class RawMaterialsService {
  constructor() {}

  async getRawMaterials() {
    const data = await model.getMaterials();
    console.log("SOY DATA SERVICE: ", data);
    return data;
  }

  async updateRaw(body, id) {
    const data = await model.update(body, id);
    return data;
  }
}

module.exports = { RawMaterialsService };
