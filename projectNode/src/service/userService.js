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

  async getUserName(email) {
    if (!email) return { message: "Email not provided" };
    try {
      const user = await model.getUserName(email);
      return user;
    } catch (error) {
      console.error("ERROR en consulta ", error);
    }
  }
  async findForAuth(email, password) {
    try {
      const row = await model.findByEmail(email, password);

      return row;
    } catch (error) {
      console.error("ERROR en consulta", error);
    }
  }

  async create(body) {
    try {
      const queryInsert = await model.create(body);

      return queryInsert;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al crear usuario ya existe o credenciales no correctas."
      );
    }
  }
}

module.exports = { UserService };
