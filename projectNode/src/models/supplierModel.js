const { pool } = require("../db/config.js");

class SupplierModel {
  constructor() {
    this.conn;
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
    console.log("DINAMYCBODY", body);
    console.log("FIELDS", fieldsBody);
    console.log("VALUES", valuesBody);

    const query = `UPDATE proveedor SET ${fields.join(", ")} WHERE id = ? `;
    console.log("SOY QUERY: ", query);
    console.log("SOY VALUES: ", values);
    try {
      return { query, values };
    } catch (error) {
      throw error;
    }
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
    console.log("====", query);
    values.push(id);
    console.log("++++", values);
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
