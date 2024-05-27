const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const auth = require('../middleware/auth');

router.post('/', auth, bidController.placeBid);
router.get('/:item_id', bidController.getBidsByItemId);

module.exports = router;
