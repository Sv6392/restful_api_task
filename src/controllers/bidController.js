const Bid = require('../models/Bid');
const Item = require('../models/Item');
const { io } = require('../app');

module.exports = {
    async placeBid(req, res) {
        const { item_id, bid_amount } = req.body;
        const user_id = req.user.id;
        try {
            const item = await Item.getItemById(item_id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            if (bid_amount <= item.current_price) {
                return res.status(400).json({ message: 'Bid amount must be higher than the current price' });
            }

            const newBid = await Bid.createBid(item_id, user_id, bid_amount);
            await Item.updateCurrentPrice(item_id, bid_amount);

            io.emit('newBid', newBid);

            res.status(201).json(newBid);
        } catch (error) {
            res.status(400).json({ message: 'Error placing bid', error });
        }
    },

    async getBidsByItemId(req, res) {
        const { item_id } = req.params;
        try {
            const bids = await Bid.getBidsByItemId(item_id);
            res.json(bids);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching bids', error });
        }
    },
};
