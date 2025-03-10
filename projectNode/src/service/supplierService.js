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
      throw error;
    }
  }

  async create(values) {
    try {
      const res = await model.create(values);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async update(data, id) {
    try {
      const res = await model.update(data, id);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleted(id) {
    try {
      const res = await model.deleted(id);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { SupplierService };
