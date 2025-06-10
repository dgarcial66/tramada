const { pool } = require("../db/config.js");


class RawCategoryModel {
    async getCategories() {
        let conn;
        try {
            conn = await pool.getConnection();
            const query = `
                SELECT 
                    id,
                    nombre_categoria_insumo AS nombre
                FROM categoria_insumos
                ORDER BY id ASC
            `;
            
            // Cambia esta línea para forzar múltiples resultados
            const rows = await conn.query(query);
            
            // Depuración importante
            console.log('Resultados completos de la consulta:', rows);
            console.log('Número de registros:', rows.length);
            
            // Asegúrate de acceder al array correcto
            const data = Array.isArray(rows[0]) ? rows[0] : rows;
            
            return {
                success: true,
                data: data
            };
        } catch (err) {
            console.error("Error en getCategories:", err);
            return {
                success: false,
                error: "Error al obtener categorías",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            };
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = { RawCategoryModel };




