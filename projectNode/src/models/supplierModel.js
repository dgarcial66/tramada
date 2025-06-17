const { pool } = require("../db/config.js");

class SupplierModel {
  constructor() {
    this.conn = null;
    this.pool = pool;
  }

  dynamicQuery(body) {
    const fields = [];
    const values = [];
    const fieldsBody = Object.keys(body);
    const valuesBody = Object.values(body);
    for (let i = 0; i < fieldsBody.length; i++) {
      fields.push(fieldsBody[i] + " = ? ");
      values.push(valuesBody[i]);
    }

    const query = `UPDATE proveedor SET ${fields.join(", ")} WHERE id = ? `;
  
      return { query, values };
  }

  async getSuppliers() {
    try {
      this.conn = await pool.getConnection();
      const query = "SELECT * FROM proveedor;";

      const res = await this.conn.query(query);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }

  async create(values) {
    try {
      this.conn = await pool.getConnection();
      const query =
        "INSERT INTO proveedor (nombre_proveedor, telefono, direccion, correo)VALUES (?, ?, ?, ?)";
      const res = await this.conn.query(query, values);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }

  async update(data, id) {
    const { query, values } = this.dynamicQuery(data);
    values.push(id);
    try {
      this.conn = await pool.getConnection();
      const res = await this.conn.query(query, values);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }

  async deleted(id) {
    try {
      this.conn = await pool.getConnection();
      const res = await this.conn.query("DELETE FROM proveedor WHERE id = ?", [
        id,
      ]);
      return res;
    } catch (error) {
      console.error(error.message);
    } finally {
      if (this.conn) this.conn.release();
    }
  }
}

module.exports = { SupplierModel };
