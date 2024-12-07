const { pool } = require("../db/config.js");

class ProductsModel {
    constructor(){}

    async getProducts(){
        const conn = await pool.getConnection();

        try{
            const query = "SELECT * FROM productos";
            const data = await conn.query(query);

            return data;
        }catch(err){
            throw new Error(err)
        }finally{
           conn.release(); 
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
  



}

module.exports = {ProductsModel};