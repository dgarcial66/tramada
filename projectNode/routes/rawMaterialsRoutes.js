const express = require("express");
const { RawMaterialsService } = require("../service/rawMaterialsService.js");

const rawMaterialsRouter = express.Router();
const service = new RawMaterialsService();

rawMaterialsRouter.get("/", async (req, res) => {
  console.log("----------------");
  try {
    const data = await service.getRawMaterials();
    console.log("ESTOY EN SUPPLIESROUTES: ", data);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { rawMaterialsRouter };
