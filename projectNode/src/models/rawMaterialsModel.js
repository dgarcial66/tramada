const { pool } = require("../db/config.js");

class RawMaterialsModel {
  constructor() {}

  dynamicQuery(body) {
    const fields = [];
    const values = [];
    const fieldsBody = Object.keys(body);
    const valuesBody = Object.values(body);
    for (let i = 0; i < fieldsBody.length; i++) {
      if (fieldsBody[i] === "id_proveedor") {
        fields.push(
          fieldsBody[i] +
            " = (SELECT id FROM proveedor WHERE nombre_proveedor = ? )"
        );
        values.push(valuesBody[i]);
      } else if (fieldsBody[i] === "categoria_insumos_id") {
        fields.push(
          fieldsBody[i] +
            " = (SELECT id FROM categoria_insumos WHERE nombre_categoria_insumo = ?)"
        );
        values.push(valuesBody[i]);
      } else {
        fields.push(fieldsBody[i] + " = ? ");
        values.push(valuesBody[i]);
      }
    }
    console.log("DINAMYCBODY", body);
    console.log("FIELDS", fieldsBody);
    console.log("VALUES", valuesBody);

    const query = `UPDATE insumos SET ${fields.join(", ")} WHERE id = ? `;
    console.log("SOY QUERY: ", query);
    console.log("SOY VALUES: ", values);
    try {
      return { query, values };
    } catch (error) {
      throw error;
    }
  }



  async create(body) {
    const conn = await pool.getConnection();
    

    const valoresConvertidos = [
      body.nombre_insumo, 
      body.color_insumo,  
      parseFloat(body.peso_insumo), 
      parseFloat(body.cantidad_insumo), 
      parseFloat(body.precio_insumo), 
      body.nombre_proveedor, 
      body.nombre_categoria_insumo 
  

    if (valoresConvertidos.slice(2, 5).some(isNaN)) {
      throw new Error("Los valores de peso, cantidad y precio deben ser números válidos");
    }
  
    const query = `
      INSERT INTO insumos 
      (nombre_insumo, color_insumo, peso_insumo, cantidad_insumo, precio_insumo, id_proveedor, categoria_insumos_id) 
      VALUES (?, ?, ?, ?, ?, 
        (SELECT id FROM proveedor WHERE nombre_proveedor = ?), 
        (SELECT id FROM categoria_insumos WHERE nombre_categoria_insumo = ?)
      )`;
  
    try {
      const res = await conn.query(query, valoresConvertidos);

      return {
        success: true,
        data: {
          id: res.insertId,
          ...body
        }
      };
    } catch (error) {
      console.error("Error en create:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async update(id, body) {
    const conn = await pool.getConnection();

    const objKeysValues = this.dynamicQuery(body);
    const query = objKeysValues.query;
    const values = objKeysValues.values;
    const idMaterial = Number(id);
    values.push(idMaterial);

    console.log("SOY BODY: ", body);

    try {
      const res = await conn.query(query, values);
      return res;
    } catch (error) {
      console.log("ERROR GENERADO EN MODELO: ", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async getMaterials() {
    const conn = await pool.getConnection();

    try {
     
      const query =
        "SELECT id, nombre_insumo, color_insumo, peso_insumo, cantidad_insumo, precio_insumo, (SELECT nombre_proveedor FROM proveedor AS p WHERE i.id_proveedor = p.id) AS proveedor, (SELECT nombre_categoria_insumo FROM categoria_insumos AS c WHERE i.categoria_insumos_id = c.id) AS categoria FROM insumos AS i;";
      const data = await conn.query(query);

      return data;
    } catch (error) {
      throw new Error(error);
    } finally {
      if (conn) conn.release();
    }
  }

//obtener id insumos 
async getRawMaterialsList() {
  const conn = await pool.getConnection();
  try {
    const query = "SELECT id, nombre_insumo FROM insumos";
    const data = await conn.query(query);
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de insumos:", error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
}
  

  async deduct(id, quantities) {
    const conn = await pool.getConnection();
    try {
      const query =
        "UPDATE insumos SET peso_insumo = peso_insumo - ?, cantidad_insumo = cantidad_insumo - ?, precio_insumo = precio_insumo - ? WHERE id = ?;";
      const idNumber = Number(id);
      const valuesQuantity = Object.values(quantities);
      valuesQuantity.push(idNumber);
      const values = valuesQuantity;
      console.log(values);
      console.log("AQUI QUANTITIES: ", quantities);
      const data = await conn.query(query, values);

      return data;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }

    


  }
}



module.exports = { RawMaterialsModel };
