const express = require('express');
const router = express.Router();
const bookController = require('../controllers/controller_book');
const upload = require('../helpers/upload')

router.get('/', bookController.showAllBooks);
router.post('/', upload.single('image'), bookController.addBooks);
router.put('/:id', upload.single('image'), bookController.updateBooks);
router.delete('/:id', bookController.deleteBooks);
router.get('/search', bookController.searchBooks);

module.exports = router;