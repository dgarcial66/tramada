const { pool } = require("../db/config.js");

class HistoricalPricesMaterials {


  async getHistoricalPricesMaterials() {
    const conn = await pool.getConnection();

    try {
      const query = `
        SELECT hpi.*, i.nombre_insumo 
        FROM historial_precios_insumos hpi
        JOIN insumos i ON hpi.insumos_id = i.id
      `;
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
      const query = `
        SELECT hpi.*, i.nombre_insumo 
        FROM historial_precios_insumos hpi
        JOIN insumos i ON hpi.insumos_id = i.id
        WHERE hpi.insumos_id = ?
      `;
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


