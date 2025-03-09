const { CategoryModel } = require("../models/categoryModel.js");

class CategoryService {
  constructor() {
    this.serviceRaw = new CategoryModel();
  }

  async getCategoryRaw() {
    const res = await this.serviceRaw.getCategoryRaw();
    return res;
  }
}

module.exports = { CategoryService };
