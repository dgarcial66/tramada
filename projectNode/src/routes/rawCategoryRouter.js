const express = require("express");
const { RawCategoryModel } = require("../models/rawCategoryModel");

const rawCategoryRouter = express.Router();
const rawCategoryModel = new RawCategoryModel();

rawCategoryRouter.get("/", async (req, res) => {
    try {
        const result = await rawCategoryModel.getCategories();
        
        // Depuración
        console.log('Resultado del modelo:', result);
        
        if (!result.success) {
            return res.status(500).json(result);
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Error en GET /raw-categories:", err);
        res.status(500).json({ 
            success: false,
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = { rawCategoryRouter };