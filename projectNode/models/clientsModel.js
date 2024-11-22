const { pool } = require("../db/config.js");


class ClientsModel {
    constructor() {}
  
    async create(body) {
      const conn = await pool.getConnection();
  
      try {
        
        const query =
          "INSERT INTO clientes (nombre_cliente, telefono_cliente, direccion_cliente, tipo_pago, tipo_cliente) VALUES (?, ?, ?, ?, ?)";
        const values = [
          body.nombre_cliente,
          body.telefono_cliente,
          body.direccion_cliente,
          body.tipo_pago,
          body.tipo_cliente,
        ];
  
        const result = await conn.query(query, values);
  
        return result; 
      } catch (err) {
        throw new Error(err); 
      } finally {
        conn.release(); 
      }
    }

      async update(body) {
      const conn = await pool.getConnection();
  
      try {
        const query = `
          UPDATE clientes 
          SET nombre_cliente = ?, telefono_cliente = ?, direccion_cliente = ?, tipo_pago = ?, tipo_cliente = ?
          WHERE id = ?
        `;
        const values = [
          body.nombre_cliente,
          body.telefono_cliente,
          body.direccion_cliente,
          body.tipo_pago,
          body.tipo_cliente,
          body.id,
        ];
  
        const result = await conn.query(query, values);
  
        return result; 
      } catch (err) {
        throw new Error(err); 
      } finally {
        conn.release(); 
      }
    }

    async getClients() {
        const conn = await pool.getConnection();
    
        try {
          const query = "SELECT * FROM clientes";
          const data = await conn.query(query);
    
          return data;
        } catch (err) {
          throw new Error(err);
        } finally {
          conn.release();
        }
      }

    async deleteClients(id) {
      const conn = await pool.getConnection();

      try {
        const result = await conn.query("DELETE FROM clientes WHERE id = ?", [id]);
        return result;
      } catch (error) {
        throw new Error("Error al eliminar el cliente: " + error.message);
      } finally{
        conn.release();
      }
    };
      
    }  


  

  module.exports = {ClientsModel};