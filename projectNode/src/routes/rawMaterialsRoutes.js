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

rawMaterialsRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const data = await service.createRawMaterials(body);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

rawMaterialsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { body, params } = req;
    console.log(body, "SOY BODY PARA UPDATEEEEEEEEEX@");
    const result = await service.updateRaw(params.id, body);
    console.log("RESPUESTA PARAMS: ", params);
    console.log("RESPUESTA: ", result);
    res.json({
      rawMaterials: "Actualizado.",
      affectedMaterials: result.affectedRows,
    });
  } catch (err) {
    console.log("SOY ERROR: ", err);
    next(err);
  }
});

rawMaterialsRouter.patch("/deduct/:id", async (req, res, next) => {
  try {
    const { params, body } = req;
    const result = await service.deductMaterial(params.id, body);
    console.log(result.affectedRows);
    res.json(result);
  } catch (err) {
    console.log("SOY ERROR: ", err);
    next(err);
  }
});

module.exports = { rawMaterialsRouter };
