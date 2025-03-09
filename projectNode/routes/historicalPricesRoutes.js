const express = require("express");
const { HistoricalPrices } = require("../models/historicalPrices");

const historicalPricesRouter = express.Router();
const historicalPricesModel = new HistoricalPrices();


historicalPricesRouter.get("/", async (req, res) => {
  try {
    const historicalPrices = await historicalPricesModel.getHistoricalPrices();
    res.status(200).json(historicalPrices);
  } catch (err) {
    console.error("Error al obtener historial de precios:", err.message);
    res.status(500).json({ error: "Error al obtener el historial de precios" });
  }
});


historicalPricesRouter.get("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const historicalPrices = await historicalPricesModel.getHistoricalPricesByProduct(product_id);
    res.status(200).json(historicalPrices);
  } catch (err) {
    console.error("Error al obtener historial de precios:", err.message);
    res.status(500).json({ error: "Error al obtener el historial de precios para el producto" });
  }
});

historicalPricesRouter.post("/", async (req, res) => {
  const { price, product_id } = req.body;
  try {
    const result = await historicalPricesModel.addHistoricalPrice(price, product_id);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error al agregar historial de precios:", err.message);
    res.status(500).json({ error: "Error al agregar el historial de precios" });
  }
});

module.exports = { historicalPricesRouter };







