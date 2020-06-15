const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller_auth');
const upload = require('../helpers/upload');

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);
// router.post('/token', upload.none(), authController.generateAccessToken);

module.exports = router;