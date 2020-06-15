const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller_auth');
const upload = require('../helpers/upload');
const authMiddleware = require('../middleware/auth_middleware');

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);
router.post('/token', upload.none(), authMiddleware.verifyJwtRefreshToken, authController.generateRefreshToken);

module.exports = router;