const express = require("express");
const { HistoricalPricesMaterials } = require("../models/historicalPricesMaterials.js");

const historicalPricesMaterialsRouter = express.Router();
const historicalPricesMaterialsModel = new HistoricalPricesMaterials();


historicalPricesMaterialsRouter.get("/", async (req, res) => {
  try {
    const historicalPrices = await historicalPricesMaterialsModel.getHistoricalPricesMaterials();
    res.status(200).json(historicalPrices);
  } catch (err) {
    console.error("Error al obtener historial de precios de insumos:", err.message);
    res.status(500).json({ error: "Error al obtener historial de precios de insumos" });
  }
});


historicalPricesMaterialsRouter.get("/material/:id", async (req, res) => {
  const materialId = req.params.id;

  try {
    const historicalPrices = await historicalPricesMaterialsModel.getHistoricalPricesByMaterial(materialId);
    if (historicalPrices.length === 0) {
      return res.status(404).json({ message: "No se encontró historial para el insumo" });
    }
    res.status(200).json(historicalPrices);
  } catch (err) {
    console.error("Error al obtener historial de precios del insumo:", err.message);
    res.status(500).json({ error: "Error al obtener historial de precios para el insumo" });
  }
});

module.exports = { historicalPricesMaterialsRouter };





