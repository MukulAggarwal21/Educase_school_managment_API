const { pool } = require('../config/database');

class School {
    static async create(schoolData) {
        const { name, address, latitude, longitude } = schoolData;
        
        const query = `
            INSERT INTO schools (name, address, latitude, longitude) 
            VALUES (?, ?, ?, ?)
        `;
        
        try {
            const [result] = await pool.execute(query, [name, address, latitude, longitude]);
            return { id: result.insertId, ...schoolData };
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    static async findAll() {
        const query = 'SELECT * FROM schools ORDER BY created_at DESC';
        
        try {
            const [rows] = await pool.execute(query);
            return rows;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    static async findById(id) {
        const query = 'SELECT * FROM schools WHERE id = ?';
        
        try {
            const [rows] = await pool.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}

module.exports = School;