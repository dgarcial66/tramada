const { pool } = require("../db/config.js");

class SuppliesModel {
  constructor(model) {}

  async create(body) {}

  async update(body) {}

  async getSupplies() {
    const conn = await pool.getConnection();

    try {
      const query = "SELECT * FROM insumos";
      const data = await conn.query(query);

      return data;
    } catch (err) {
      throw new Error(err);
    } finally {
      conn.release();
    }
  }

  async delete(id) {}
}

module.exports = { SuppliesModel };
