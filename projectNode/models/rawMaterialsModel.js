const { pool } = require("../db/config.js");

class RawMaterialsModel {
  constructor(model) {}

  async create(body) {}

  async update(body) {}

  async getMaterials() {
    const conn = await pool.getConnection();

    try {
      const query = "SELECT * FROM insumos";
      const data = await conn.query(query);

      return data;
    } catch (err) {
      throw new Error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async delete(id) {}
}

module.exports = { RawMaterialsModel };
