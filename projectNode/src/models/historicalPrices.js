const { pool } = require("../db/config.js");

class HistoricalPrices {


    async getHistoricalPrices() {
        const conn = await pool.getConnection();
    
        try {
            const query = `
    SELECT h.id, h.precios_producto, h.fecha_historial, h.producto_id, p.nombre_producto AS nombre_producto
    FROM historial_precios_productos h
    JOIN productos p ON h.producto_id = p.id
`;

            const data = await conn.query(query);
            return data;
        } catch (err) {
            throw new Error("Error al obtener historial de precios: " + err.message);
        } finally {
            conn.release();
        }
    }
    


    async getHistoricalPricesByProduct(productId) {
        const conn = await pool.getConnection();

        try {
            const query = "SELECT * FROM historial_precios_productos WHERE producto_id = ?";
            const data = await conn.query(query, [productId]);
            return data;
        } catch (err) {
            throw new Error("Error al obtener historial de precios para el producto: " + err.message);
        } finally {
            conn.release();
        }
    }


    async addHistoricalPrice(price, productId) {
        const conn = await pool.getConnection();

        try {
            const query = "INSERT INTO historial_precios_productos (precios_producto, producto_id) VALUES (?, ?)";
            const result = await conn.query(query, [price, productId]);
            return result;
        } catch (err) {
            throw new Error("Error al agregar historial de precios: " + err.message);
        } finally {
            conn.release();
        }
    }
}

module.exports = { HistoricalPrices };



