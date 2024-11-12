const { UserModel } = require("../models/userModel.js");

let conn;
const model = new UserModel();

class UserService {
  constructor() {}

  async getUser() {
    try {
      const row = await model.getUser();

      return row;
    } catch (error) {
      console.error("ERROR en consulta", error);
    } finally {
      if (conn) conn.end();
    }
  }

  async findForAuth(email) {
    try {
      const row = await model.findByEmail(email);

      return row;
    } catch (error) {
      console.error("ERROR en consulta", error);
    } finally {
      if (conn) conn.end();
    }
  }

  async create(body) {
    try {
      const queryInsert = await model.create(body);

      return queryInsert.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al crear usuario ya existe o credenciales no correctas."
      );
    }
  }
}

module.exports = { UserService };
