const express = require('express');
const router = express.Router();
const payCtrl = require('../controllers/paiement');


router.post('/payit', payCtrl.payit);
router.post('/ipn', payCtrl.ipn);
router.post('/checkout', payCtrl.checkout);

module.exports = router;