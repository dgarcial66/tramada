const express = require("express");
const { CategoryService } = require("../service/categoryService.js");

const categoryRoutes = express.Router();
const service = new CategoryService();

categoryRoutes.get("/raw", async (req, res) => {
  try {
    const results = await service.getCategoryRaw();
    res.json(results);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { categoryRoutes };
