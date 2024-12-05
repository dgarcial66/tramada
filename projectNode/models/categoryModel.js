const { pool } = require("../db/config.js");

class CategoryModel {
  constructor() {
    this.conn = null;
  }

  // async getCategoryName(name) {
  //   try {
  //     const
  //   }catch (error) {
  //     throw new Error(error)
  //   }
  // }

  async getCategoryRaw() {
    try {
      this.conn = await pool.getConnection();
      const query = "SELECT * FROM categoria_insumos;";
      const res = await this.conn.query(query);

      console.log(res);
      return res;
    } catch (error) {
      throw new Error(error);
    } finally {
      if (this.conn) this.conn.release();
    }
  }
}

module.exports = { CategoryModel };
