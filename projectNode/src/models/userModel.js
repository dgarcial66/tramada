const { pool } = require("../db/config.js");
const bcrypt = require("bcryptjs");

let conn;

class UserModel {

  async getUser() {
    try {
      conn = await pool.getConnection();
      const query = "SELECT id, email, password, id_rol FROM usuario";

      const row = await conn.query(query);

      return row;
    } catch (error) {
      console.error("ERROR en consulta", error);
    } finally {
      if (conn) conn.release();
    }
  }

  async getUserName(email) {
    console.log("HASTA AQUI NO LLEGO??", email);
    try {
      conn = await pool.getConnection();
      const query = "SELECT email FROM usuario WHERE email = ?";
      const listQuery = [email];
      const rows = conn.query(query, listQuery);
      return rows;
    } catch (error) {
      console.error("ERROR en consulta", error);
    } finally {
      if (conn) conn.release();
    }
  }
  async findByEmail(email, password) {
    try {
      console.log("SOY EMAIL: ", email);
      conn = await pool.getConnection();
      console.log("SIIII: ", conn);
      const query =
        "SELECT id, email, password, id_rol FROM usuario WHERE email = ?";
      const listQuery = [email];

      const row = await conn.query(query, listQuery);
      console.log("SOY ROWMODEL: ", row);
      const isMatch = await bcrypt.compare(password, row[0].password);
      console.log("SOY ISMATCH: ", isMatch);
      if (!isMatch) return;
      return row;
    } catch (error) {
      console.error("ERROR en consulta", error);
    } finally {
      if (conn) conn.release();
    }
  }

  async create(body) {
    try {
      conn = await pool.getConnection();

      const { password } = body;
      const hash = await bcrypt.hash(password, 10);
      const insert =
        "INSERT INTO usuario (email, password, id_rol) VALUES (?, ?, ?);";
      const listInsert = [body.email, hash, 2];

      const queryInsert = await conn.query(insert, listInsert);

      console.log("SOY QUERY INSERT: ", queryInsert.affectedRows);

      return queryInsert.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al crear usuario ya existe o credenciales no correctas."
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = { UserModel };
