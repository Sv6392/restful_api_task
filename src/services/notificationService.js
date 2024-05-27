const Notification = require('../models/Notification');

module.exports = {
    async sendNotification(user_id, message) {
        const notification = await Notification.createNotification(user_id, message);
        return notification;
    },
};
