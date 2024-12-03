const express = require("express");
const { InventoryMovements } = require("../models/inventoryMovements.js");

const inventoryRouter = express.Router();
const inventoryModel = new InventoryMovements();

inventoryRouter.get("/", async (req, res) => {
  try {
    const inventory = await inventoryModel.getInventoryMovements();

    res.status(200).json(inventory);
  } catch (err) {
    console.error("Error al obtener clientes:", err.message);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

module.exports = { inventoryRouter };
