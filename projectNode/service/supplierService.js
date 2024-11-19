const { SupplierModel } = require("../models/supplierModel.js");

const model = new SupplierModel();
class SupplierService {
  constructor() {}

  async getSupplier() {
    try {
      const res = await model.getSuppliers();
      console.log("RES DE SERVICE: ", res);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { SupplierService };
