const { pool } = require("../db/config.js");

class HistoricalPricesMaterials {
  constructor() {}

  async getHistoricalPricesMaterials() {
    const conn = await pool.getConnection();

    try {
      const query = "SELECT * FROM historial_precios_insumos";
      const data = await conn.query(query);

      return data;
    } catch (err) {
      throw new Error(err);
    } finally {
      conn.release();
    }
  }


  async getHistoricalPricesByMaterial(materialId) {
    const conn = await pool.getConnection();

    try {
      const query = "SELECT * FROM historial_precios_insumos WHERE insumos_id = ?";
      const data = await conn.query(query, [materialId]);

      return data;
    } catch (err) {
      throw new Error(err);
    } finally {
      conn.release();
    }
  }
}

module.exports = { HistoricalPricesMaterials };


