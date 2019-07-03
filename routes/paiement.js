const express = require('express');
const router = express.Router();
const payCtrl = require('../controllers/paiement');
const emailCtrl = require('../controllers/email');
const userCtrl = require('../controllers/user');

router.post('/payit', payCtrl.payit);
router.post('/ipn', payCtrl.ipn);
router.post('/checkout', payCtrl.checkout);
router.get('/payed', payCtrl.payed);
router.get('/notpayed', payCtrl.notpayed);

router.post('/user', userCtrl.useradd);
router.get('/user', userCtrl.getuser);

router.post('/email', emailCtrl.sendEmail);
module.exports = router;