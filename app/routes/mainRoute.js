const express = require('express');
const router = express.Router();
const bookRouter = require('./book_router');
const authorRouter = require('./author_router');
const genreRouter = require('./genre_router');
const authRouter = require('./auth_router')
const {
    verifyJwtToken
} = require('../middleware/auth_middleware');

router.use('/auth', authRouter);
router.use('/books', verifyJwtToken, bookRouter);
router.use('/author', verifyJwtToken, authorRouter);
router.use('/genre', verifyJwtToken, genreRouter);

module.exports = router;