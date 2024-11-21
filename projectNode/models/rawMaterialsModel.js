const { query } = require("express");
const { pool } = require("../db/config.js");

class RawMaterialsModel {
  constructor(model) {}

  dynamicQuery(body) {
    const fields = [];
    const values = [];
    const fieldsBody = Object.keys(body);
    const valuesBody = Object.values(body);
    for (let i = 0; i < fieldsBody.length; i++) {
      fields.push(fieldsBody[i] + " = ? ");
      values.push(valuesBody[i]);
    }

    const query = `UPDATE insumos SET ${fields.join(", ")} WHERE id = ? `;
    return { query, values };
  }

  async create(body) {}

  async update(body, id) {
    const conn = await pool.getConnection();

    const objKeysValues = await this.dynamicQuery(body);
    const query = objKeysValues.query;
    const values = objKeysValues.values;
    const idMaterial = Number(id);
    values.push(idMaterial);

    console.log("SOY BODY: ", body);

    try {
      const res = await conn.query(query, values);
      return res;
    } catch (error) {
      throw new Error(error);
    } finally {
      if (conn) conn.release();
    }
  }

  async getMaterials() {
    const conn = await pool.getConnection();

    try {
      // const query = "SELECT * FROM insumos INNER JOIN proveedor ON insumos.id_proveedor = proveedor.id";
      const query =
        "SELECT id, nombre_insumo, color_insumo, peso_insumo, tipo_insumo, cantidad_insumo, precio_insumo, (SELECT nombre_proveedor FROM proveedor AS p WHERE i.id_proveedor = p.id) AS proveedor, (SELECT nombre_categoria_insumo FROM categoria_insumos AS c WHERE i.categoria_insumos_id = c.id) AS categoria FROM insumos AS i;";
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
