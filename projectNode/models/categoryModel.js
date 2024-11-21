const { pool } = require("../db/config.js");

class CategoryModel {
  constructor() {
    this.conn = null;
  }

  async getCategoryRaw() {
    try {
      this.conn = await pool.getConnection();
      const query = "SELECT * FROM categoria_insumos;";
      const res = await this.conn.query(query);

      console.log(res);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }
}

module.exports = { CategoryModel };
