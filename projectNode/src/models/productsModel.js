const { pool } = require("../db/config.js");

class ProductsModel {
    constructor(){}


    async getProducts() {
      const conn = await pool.getConnection();
      try {
          const query = `
              SELECT 
                  p.id,
                  p.nombre_producto,
                  p.genero_producto,
                  p.tipo_producto,
                  p.talla_producto,
                  p.color_producto,
                  p.peso_producto,
                  p.cantidad_producto,
                  p.precio_producto,
                  p.categoria_productos_id,
                  cp.nombre_categoria AS nombre_categoria,
                  p.fecha_actualizacion
              FROM productos p
              JOIN categoria_productos cp ON p.categoria_productos_id = cp.id
          `;
          const data = await conn.query(query);
          return data;
      } catch (err) {
          throw new Error(err);
      } finally {
          conn.release();
      }
    }

    async getSimpleProducts() {
      let conn;
      try {
        conn = await pool.getConnection();
        const query = "SELECT id, nombre_producto FROM productos";
        const rows = await conn.query(query);
        return rows;
      } catch (error) {
        console.error("Error al obtener productos básicos:", error);
        throw new Error("Error al obtener productos");
      } finally {
        if (conn) conn.release();
      }
    }

    async addProduct(body) {
        const conn = await pool.getConnection();
    
        try {
          
          const query =
            "INSERT INTO productos (nombre_producto, genero_producto, tipo_producto, talla_producto, color_producto, peso_producto, cantidad_producto, precio_producto, categoria_productos_id, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            body.nombre_producto,
            body.genero_producto,
            body.tipo_producto,
            body.talla_producto,
            body.color_producto,
            body.peso_producto,
            body.cantidad_producto,
            body.precio_producto,
            body.categoria_productos_id,
            body.fecha_actualizacion
          ];
    
          const result = await conn.query(query, values);
    
          return result; 
        } catch (err) {
          throw new Error(err); 
        } finally {
          conn.release(); 
        }
      }

      async updateProduct(body) {
        const conn = await pool.getConnection();
    
        try {
          const query = `
            UPDATE productos 
            SET nombre_producto = ?, genero_producto = ?, tipo_producto = ?, talla_producto = ?, color_producto = ?, peso_producto = ?, cantidad_producto = ?, precio_producto = ?, categoria_productos_id = ?, fecha_actualizacion = ?
            WHERE id = ?
          `;
          const values = [
            body.nombre_producto,
            body.genero_producto,
            body.tipo_producto,
            body.talla_producto,
            body.color_producto,
            body.peso_producto,
            body.cantidad_producto,
            body.precio_producto,
            body.categoria_productos_id,
            body.fecha_actualizacion,
            body.id
          ];
    
          const result = await conn.query(query, values);
    
          return result; 
        } catch (err) {
          throw new Error(err); 
        } finally {
          conn.release(); 
        }
      }

      async deleteProducts(id) {
        const conn = await pool.getConnection();
  
        try {
          const result = await conn.query("DELETE FROM productos WHERE id = ?", [id]);
          return result;
        } catch (error) {
          throw new Error("Error al eliminar el producto: " + error.message);
        } finally{
          conn.release();
        }
      };



// Aqui obtenemos las categorias desde la base de datos 
       async getProductCategories() {
    const conn = await pool.getConnection();
    try {
      const query = "SELECT id, nombre_categoria FROM categoria_productos"; 
      const data = await conn.query(query);
      console.log('Datos de categorías desde DB:', data); 
      return data;
    } catch (err) {
      console.error("Error en getProductCategories:", err);
      throw err;
    } finally {
      conn.release();
    }
  }

 
}

module.exports = {ProductsModel};