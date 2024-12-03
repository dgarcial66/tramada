const express = require("express");
const { Sales } = require("../models/salesModel")

const salesRoutes = express.Router();
const salesModel = new Sales();

salesRoutes.get("/", async (req, res) => {
    try {
      const sales = await salesModel.getSales();
  
      res.status(200).json(sales); 
    } catch (err) {
      console.error("Error al obtener ventas:", err.message);
      res.status(500).json({ error: "Error al obtener las ventas" });
    }
  });

salesRoutes.post("/", async (req, res) => {
    try {
        const result = await salesModel.addSales(req.body);
        res.status(201).json({ message: "Venta registrada con éxito", data: result });
    } catch (error) {
        console.error("Error al registrar la venta", error.message)
        res.status(500).json({ error: "Error al registrar la venta", details: error.message });
        
    }
});

salesRoutes.put('/', async (req, res) => {
    try {
      const result = await salesModel.updateSales(req.body);
      res.json({ message: "Venta actualizada con éxito", result });
    } catch (err) {
        console.error("Error al actualizar la venta", err.message)
      res.status(500).json({ error: "Error al actualizar la venta" });
    }
  });

  module.exports = {salesRoutes};