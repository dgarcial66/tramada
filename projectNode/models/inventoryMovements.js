const {pool} = require("../db/config.js");

class InventoryMovements {
    constructor(){}

    async getInventoryMovements() {
        const conn = await pool.getConnection();
    
        try {
          const query = "SELECT * FROM movimientos_inventario";
          const data = await conn.query(query);
    
          return data;
        } catch (err) {
          throw new Error(err);
        } finally {
          conn.release();
        }
      }


}

module.exports = {InventoryMovements};

