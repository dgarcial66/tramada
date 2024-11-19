const express = require("express");
const { SupplierService } = require("../service/supplierService.js");

const supplierRouter = express.Router();
const service = new SupplierService();

supplierRouter.get("/", async (req, res) => {
  try {
    const supplier = await service.getSupplier();
    return res.json(supplier);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = { supplierRouter };
