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

supplierRouter.post("/", async (req, res) => {
  const { body } = req;
  try {
    const result = await service.create(body);
    console.log(result);
    res.json(result);
  } catch (error) {
    throw error;
  }
});

supplierRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = await service.update(body, Number(id));
    res.status(201).json(updated);
  } catch (error) {
    throw error;
  }
});

supplierRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await service.deleted(id);
    res.status(204).json(deleted);
  } catch (error) {
    throw error;
  }
});

module.exports = { supplierRouter };
