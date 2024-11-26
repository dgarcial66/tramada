const express = require("express");
const { authRouter } = require("./authRoutes.js");
const { userRoutes } = require("./userRoutes.js");
const { rawMaterialsRouter } = require("./rawMaterialsRoutes.js");
const { supplierRouter } = require("./supplierRoutes.js");
const { categoryRoutes } = require("./categoryRoutes.js");
const { clientRouter } = require("./clientRouter.js");
const { productsRouter } = require("./productsRouter.js");
const { orderRoutes } = require("./orderRoutes.js");

BigInt.prototype.toJSON = function () {
  return this.toString();
};

function routerApi(app) {
  const routes = express.Router();
  app.use("/api/v1", routes);
  routes.use("/auth", authRouter);
  routes.use("/user", userRoutes);
  routes.use("/rawMaterials", rawMaterialsRouter);
  routes.use("/supplier", supplierRouter);
  routes.use("/categories", categoryRoutes);
  routes.use("/clients", clientRouter);
  routes.use("/products", productsRouter);
  routes.use("/order", orderRoutes);
}

module.exports = { routerApi };
