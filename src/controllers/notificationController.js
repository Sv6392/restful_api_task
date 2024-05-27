const Notification = require('../models/Notification');

module.exports = {
    async getNotifications(req, res) {
        const user_id = req.user.id;
        try {
            const notifications = await Notification.getNotificationsByUserId(user_id);
            res.json(notifications);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching notifications', error });
        }
    },
};
