const pool = require('./db');

const createItemsTable = `
    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        starting_price DECIMAL NOT NULL,
        current_price DECIMAL DEFAULT starting_price,
        image_url VARCHAR(255),
        end_time TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createItemsTable)
    .then(() => console.log('Items table created'))
    .catch((err) => console.error('Error creating items table', err));

module.exports = {
    async createItem(name, description, starting_price, end_time, image_url) {
        const result = await pool.query(
            'INSERT INTO items (name, description, starting_price, current_price, end_time, image_url) VALUES ($1, $2, $3, $3, $4, $5) RETURNING *',
            [name, description, starting_price, end_time, image_url]
        );
        return result.rows[0];
    },
    async getItemById(id) {
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
        return result.rows[0];
    },
    async getAllItems(limit, offset) {
        const result = await pool.query('SELECT * FROM items LIMIT $1 OFFSET $2', [limit, offset]);
        return result.rows;
    },
};
