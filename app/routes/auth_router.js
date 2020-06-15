const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller_auth');
const upload = require('../helpers/upload');
const {
    verifyJwtRefreshToken
} = require('../middleware/auth_middleware');

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);
router.post('/token', upload.none(), verifyJwtRefreshToken, authController.generateRefreshToken);

module.exports = router;