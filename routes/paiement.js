const express = require('express');
const router = express.Router();
const payCtrl = require('../controllers/paiement');

router.post('/', payCtrl.payit);
router.post('/', payCtrl.ipn);

module.exports = router;