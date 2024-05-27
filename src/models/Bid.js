const pool = require('./db');

const createBidsTable = `
    CREATE TABLE IF NOT EXISTS bids (
        id SERIAL PRIMARY KEY,
        item_id INTEGER REFERENCES items(id),
        user_id INTEGER REFERENCES users(id),
        bid_amount DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createBidsTable)
    .then(() => console.log('Bids table created'))
    .catch((err) => console.error('Error creating bids table', err));

module.exports = {
    async createBid(item_id, user_id, bid_amount) {
        const result = await pool.query(
            'INSERT INTO bids (item_id, user_id, bid_amount) VALUES ($1, $2, $3) RETURNING *',
            [item_id, user_id, bid_amount]
        );
        return result.rows[0];
    },
    async getBidsByItemId(item_id) {
        const result = await pool.query('SELECT * FROM bids WHERE item_id = $1', [item_id]);
        return result.rows;
    },
};
