const { pool } = require("../db/config.js");

class SupplierModel {
  constructor() {
    this.conn;
    this.pool = pool;
  }
  async getSuppliers() {
    try {
      this.conn = await pool.getConnection();
      console.log("CONN: ", this.conn);
      const query = "SELECT * FROM proveedor;";

      const res = await this.conn.query(query);
      console.log("RES DE SUPPLIER: ", res);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }
}

module.exports = { SupplierModel };
