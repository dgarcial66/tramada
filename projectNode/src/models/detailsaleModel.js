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


async getDetailSales() {
  const conn = await pool.getConnection();

  try {
    const query = `
      SELECT ds.*, p.nombre_producto
      FROM detalle_venta ds
      JOIN productos p ON ds.productos_id = p.id
    `;
    const data = await conn.query(query);
    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    conn.release();
  }
}
}

module.exports = { DetailSales };
