const { pool } = require("../db/config.js");

class DetailSales {
  constructor() {}

  async addDetailSales(body) {
    const conn = await pool.getConnection();

    try {
      const query =
        "INSERT INTO detalle_venta (cantidad, precio_unitario, subtotal, ventas_id, productos_id) VALUES (?, ?, ?, ?, ?)";
      const values = [
        body.cantidad,
        body.precio_unitario,
        body.subtotal,
        body.ventas_id,
        body.productos_id,
      ];

      const result = await conn.query(query, values);

      return result;
    } catch (err) {
      throw new Error(err);
    } finally {
      conn.release();
    }
  }
}

module.exports = { DetailSales };
