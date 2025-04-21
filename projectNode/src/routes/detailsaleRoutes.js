const express = require("express");
const { DetailSales } = require("../models/detailsaleModel");

const detailsalesRoutes = express.Router();
const detailsalesModel = new DetailSales();

// Ruta para registrar detalle de venta
detailsalesRoutes.post("/", async (req, res) => {
  try {
    const result = await detailsalesModel.addDetailSales(req.body);
    res.status(201).json({ message: "Venta registrada con éxito", data: result });
  } catch (error) {
    console.error("Error al registrar la venta", error.message);
    res.status(500).json({ error: "Error al registrar la venta", details: error.message });
  }
});

// ✅ Nueva ruta para obtener los detalles de venta con el nombre del producto
detailsalesRoutes.get("/", async (req, res) => {
  try {
    const data = await detailsalesModel.getDetailSales();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener los detalles de venta:", error.message);
    res.status(500).json({ error: "Error al obtener los detalles de venta", details: error.message });
  }
});

module.exports = { detailsalesRoutes };

