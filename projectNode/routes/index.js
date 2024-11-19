const express = require("express");
const { authRouter } = require("./authRoutes.js");
const { userRoutes } = require("./userRoutes.js");
const { rawMaterialsRouter } = require("./rawMaterialsRoutes.js");
const { supplierRouter } = require("./supplierRoutes.js");

function routerApi(app) {
  const routes = express.Router();
  app.use("/api/v1", routes);
  routes.use("/auth", authRouter);
  routes.use("/user", userRoutes);
  routes.use("/rawMaterials", rawMaterialsRouter);
  routes.use("/supplier", supplierRouter);
}

module.exports = { routerApi };
