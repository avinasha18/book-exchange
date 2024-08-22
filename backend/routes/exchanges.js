const express = require('express');
const router = express.Router();
const { requestExchange, getUserExchanges, respondToExchange } = require('../controllers/exchangeController');
const auth = require('../middleware/auth');

router.post('/', auth, requestExchange);
router.get('/', auth, getUserExchanges);
router.put('/:id', auth, respondToExchange);

module.exports = router;