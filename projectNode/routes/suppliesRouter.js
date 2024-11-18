const express = require("express");
const { SuppliesService } = require("../service/suppliesService.js");

const suppliesRouter = express.Router();
const service = new SuppliesService();

suppliesRouter.get("/", async (req, res) => {
  console.log("----------------");
  try {
    const data = await service.getSupplies();
    console.log("ESTOY EN SUPPLIESROUTES: ", data);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { suppliesRouter };
