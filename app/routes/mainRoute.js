const express = require('express');
const router = express.Router();
const bookRouter = require('./book_router');
const authorRouter = require('./author_router');
const genreRouter = require('./genre_router');
const authRouter = require('./auth_router')

router.use('/books', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/auth', authRouter);

module.exports = router;