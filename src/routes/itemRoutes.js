const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.post('/', auth, itemController.createItem);
router.get('/:id', itemController.getItem);
router.get('/', itemController.getAllItems);

module.exports = router;
