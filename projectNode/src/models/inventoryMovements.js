const {pool} = require("../db/config.js");

class InventoryMovements {


    async getInventoryMovements() {
      const conn = await pool.getConnection();
    
      try {
        const query = `
          SELECT mi.*, 
                 i.nombre_insumo, 
                 p.nombre_producto
          FROM movimientos_inventario mi
          LEFT JOIN insumos i ON mi.insumos_id = i.id
          LEFT JOIN productos p ON mi.producto_id = p.id
        `;
        const data = await conn.query(query);
    
        return data;
      } catch (err) {
        throw new Error(err);
      } finally {
        conn.release();
      }
    }

   async addInventoryMovements(body){

    const conn = await pool.getConnection();
  
    try {
      
      const query =
        "INSERT INTO movimientos_inventario (tipo_movimiento, cantidad, fecha_movimiento, motivo, insumos_id, producto_id, orden_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        body.tipo_movimiento,
        body.cantidad,
        body.fecha_movimiento,
        body.motivo,
        body.insumos_id,
        body.producto_id,
        body.orden_id
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

module.exports = {InventoryMovements};

