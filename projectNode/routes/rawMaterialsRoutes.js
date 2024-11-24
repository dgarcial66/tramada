const express = require("express");
const { RawMaterialsService } = require("../service/rawMaterialsService.js");

const rawMaterialsRouter = express.Router();
const service = new RawMaterialsService();

rawMaterialsRouter.get("/", async (req, res, next) => {
  console.log("----------------");
  try {
    const data = await service.getRawMaterials();
    console.log("ESTOY EN SUPPLIESROUTES: ", data);
    res.json(data);
  } catch (error) {
    console.log("SOY ERROR: ", error);
    next(error);
  }
});

rawMaterialsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { body, params } = req;
    const result = await service.updateRaw(body, params.id);
    console.log("RESPUESTA PARAMS: ", params);
    console.log("RESPUESTA: ", result);
    res.json({
      rawMaterials: "Actualizado.",
      affectedMaterials: result.affectedRows,
    });
  } catch (error) {
    console.log("SOY ERROR: ", error);
    next(error);
  }
});

rawMaterialsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { params } = req;
    const result = await service.deleteMaterial(params.id);
    console.log(result.affectedRows);
    res.json(result);
  } catch (error) {
    console.log("SOY ERROR: ", error);
    next(error);
  }
});

module.exports = { rawMaterialsRouter };
