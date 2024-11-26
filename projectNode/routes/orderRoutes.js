const express = require("express");
const { orderModels } = require("../models/production_order");
const router = express.Router();
const { pool } = require("../db/config"); 
const orderModel = new orderModels(); 


router.get("/", async (req, res) => {
  try {
    const orders = await orderModel.getAllOrder();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las órdenes: " + err.message });
  }
});

router.get("/:id", async (req, res) => {
  const orderId = req.params.id;  
  try {
    const order = await orderModel.getOrderById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Orden no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la orden: " + err.message });
  }
});


router.post("/", async (req, res) => {
  const { fecha_entrega, cantidad_productos_solicitada, cantidad_insumo_necesaria, usuario_id, anotaciones, estado_orden, insumos_id, producto_id } = req.body;

  try {
 
    if (!fecha_entrega || !cantidad_productos_solicitada || !cantidad_insumo_necesaria || !usuario_id || !insumos_id || !producto_id) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }


    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(fecha_entrega)) {
      return res.status(400).json({ error: 'La fecha de entrega debe estar en formato YYYY-MM-DD HH:MM:SS' });
    }

    if (isNaN(cantidad_productos_solicitada) || isNaN(cantidad_insumo_necesaria)) {
      return res.status(400).json({ error: 'Las cantidades deben ser números enteros' });
    }

    const validStatuses = ['completado', 'en proceso', 'en revision'];
    if (!validStatuses.includes(estado_orden)) {
      return res.status(400).json({ error: 'Estado de orden no válido' });
    }


    const conn = await pool.getConnection();

    const userExists = await conn.query('SELECT 1 FROM usuario WHERE id = ?', [usuario_id]);

    if (!userExists.length) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }

    const rawMaterialExists = await conn.query('SELECT 1 FROM insumos WHERE id = ?', [insumos_id]);
    if (!rawMaterialExists.length) {
      return res.status(400).json({ error: 'El insumo no existe' });
    }

    const productExists = await conn.query('SELECT 1 FROM productos WHERE id = ?', [producto_id]);
    if (!productExists.length) {
      return res.status(400).json({ error: 'El producto no existe' });
    }


    const order = await orderModel.addOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar la orden: " + err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await orderModel.updateOrder({ ...req.body, id: req.params.id });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la orden: " + err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const result = await orderModel.deleteOrder(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la orden: " + err.message });
  }
});

module.exports = { orderRoutes: router };
