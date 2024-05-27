const pool = require('./db');

const createNotificationsTable = `
    CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        message VARCHAR(255) NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createNotificationsTable)
    .then(() => console.log('Notifications table created'))
    .catch((err) => console.error('Error creating notifications table', err));

module.exports = {
    async createNotification(user_id, message) {
        const result = await pool.query(
            'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
            [user_id, message]
        );
        return result.rows[0];
    },
    async getNotificationsByUserId(user_id) {
        const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1', [user_id]);
        return result.rows;
    },
};
