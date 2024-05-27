const Item = require('../models/Item');

module.exports = {
    async createItem(req, res) {
        const { name, description, starting_price, end_time, image_url } = req.body;
        try {
            const newItem = await Item.createItem(name, description, starting_price, end_time, image_url);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: 'Error creating item', error });
        }
    },

    async getItem(req, res) {
        const { id } = req.params;
        try {
            const item = await Item.getItemById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(item);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching item', error });
        }
    },

    async getAllItems(req, res) {
        const { limit = 10, offset = 0 } = req.query;
        try {
            const items = await Item.getAllItems(limit, offset);
            res.json(items);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching items', error });
        }
    },
};
