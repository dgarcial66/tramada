const { SuppliesModel } = require("../models/suppliesModel.js");

const model = new SuppliesModel();

class SuppliesService {
  constructor() {}

  async getSupplies() {
    const data = await model.getSupplies();
    console.log("SOY DATA SERVICE: ", data);
    return data;
  }
}

module.exports = { SuppliesService };
