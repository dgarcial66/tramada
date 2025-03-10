const {pool} = require("../db/config.js");

class Sales {
    constructor(){}

    async getSales() {
        const conn = await pool.getConnection();
    
        try {
          const query = "SELECT * FROM venta";
          const data = await conn.query(query);
    
          return data;
        } catch (err) {
          throw new Error(err);
        } finally {
          conn.release();
        }
      }

      async addSales(body) {
        const conn = await pool.getConnection();
    
        try {
          
          const query =
            "INSERT INTO venta (fecha_venta, estado_pago, tipo_venta, total_venta, comentarios, clientes_id) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [
            body.fecha_venta,
            body.estado_pago,
            body.tipo_venta,
            body.total_venta,
            body.comentarios,
            body.clientes_id,
          ];
    
          const result = await conn.query(query, values);
    
          return result; 
        } catch (err) {
          throw new Error(err); 
        } finally {
          conn.release(); 
        }
      }

      async updateSales(body) {
        const conn = await pool.getConnection();
    
        try {
          const query = `
            UPDATE venta 
            SET fecha_venta = ?, estado_pago = ?, tipo_venta = ?, total_venta = ?, comentarios = ?, clientes_id = ?
            WHERE id = ?
          `;
          const values = [
            body.fecha_venta,
            body.estado_pago,
            body.tipo_venta,
            body.total_venta,
            body.comentarios,
            body.clientes_id,
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


}

module.exports = {Sales};