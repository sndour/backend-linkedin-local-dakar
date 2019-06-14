const express = require('express');
const router = express.Router();
const payCtrl = require('../controllers/paiement');
const emailCtrl = require('../controllers/email');

router.post('/payit', payCtrl.payit);
router.post('/ipn', payCtrl.ipn);
router.post('/checkout', payCtrl.checkout);


router.post('/email', emailCtrl.sendEmail);
module.exports = router;