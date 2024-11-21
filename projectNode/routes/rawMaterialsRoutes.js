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

rawMaterialsRouter.patch("/:id", async (req, res) => {
  const { body, params } = req;
  const result = await service.updateRaw(body, params.id);
  console.log("RESPUESTA PARAMS: ", params);
  console.log("RESPUESTA: ", result);
  res.json({
    rawMaterials: "Actualizado.",
    affectedMaterials: result.affectedRows,
  });
});

module.exports = { rawMaterialsRouter };
