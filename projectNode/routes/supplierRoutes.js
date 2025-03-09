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

supplierRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log("ID DE PROVEEDOR: ", id);
    const deleted = await service.deleted(id);
    console.log("RESPONDO POR #", deleted);
    if (deleted) {
      if (deleted.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Item eliminado con éxito.", deleted });
      } else {
        return res.status(404).json({ message: "Item no encontrado." });
      }
    }

    res.status(500).json({ message: "No se puede eliminar el proveedor" });
  } catch (error) {
    console.log("RESPONDO???");
    res.status(500).json({
      message: "Error al eliminar el item.",
      error,
    });
    throw error;
  }
});

module.exports = { supplierRouter };
