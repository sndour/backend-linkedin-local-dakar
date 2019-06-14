const express = require('express');
const router = express.Router();
const emailCtrl = require('../controllers/email');

router.post('/email', emailCtrl.sendEmail);