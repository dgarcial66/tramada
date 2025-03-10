const express = require("express");
const { DetailSales } = require("../models/detailsaleModel")

const detailsalesRoutes = express.Router();
const detailsalesModel = new DetailSales();

detailsalesRoutes.post("/", async (req, res) => {
    try {
        const result = await detailsalesModel.addDetailSales(req.body);
        res.status(201).json({ message: "Venta registrada con éxito", data: result });
    } catch (error) {
        console.error("Error al registrar la venta", error.message)
        res.status(500).json({ error: "Error al registrar la venta", details: error.message });
        
    }
});

module.exports = {detailsalesRoutes};
