const express = require("express");
const { ProductsModel } = require("../models/productsModel");

const productsRouter = express.Router();
const productsModel = new ProductsModel();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsModel.getProducts();

    res.status(200).json(products);
  } catch {
    console.error("Error al obtener productos:", err.message);
    res.status(500).json({ error: "Error al obtener los prodcutos" });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const result = await productsModel.addProduct(req.body);
    res
      .status(201)
      .json({ message: "Producto registrado con éxito", data: result });
  } catch (error) {
    console.error("Error al registrar al producto", error.message);
    res.status(500).json({
      error: "Error al registrar el Producto",
      details: error.message,
    });
  }
});

productsRouter.put("/", async (req, res) => {
  try {
    const result = await productsModel.updateProduct(req.body);
    res.json({ message: "Producto actualizado con éxito", result });
  } catch (err) {
    console.error("Error al actualizar el producto", err.message);
    res.status(500).json({ error: "Error al actualizar el prodcuto" });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsModel.deleteProducts(id);
    res.json(result);
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

//Aqui se define la ruta para obtener las categorias

productsRouter.get("/product-categories", async (req, res) => {
  try {
    const categories = await productsModel.getProductCategories();
    console.log('Categorías encontradas:', categories);
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error al obtener categorías:", err.message);
    res.status(500).json({ 
      error: "Error al obtener las categorías",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = { productsRouter };
