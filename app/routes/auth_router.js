const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller_auth');

router.post('/register', authController.register);

module.exports = router;