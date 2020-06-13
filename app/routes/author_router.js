const express = require('express');
const router = express.Router();
const authorController = require('../controllers/controller_author');
const upload = require('../helpers/upload');

router.get('/', authorController.getAllAuthor);
router.post('/', upload.none(), authorController.addAuthor);
router.put('/:id', upload.none(), authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/search', authorController.searchAuthor);

module.exports = router;