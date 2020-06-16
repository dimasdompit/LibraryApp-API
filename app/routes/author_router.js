const express = require('express');
const router = express.Router();
const authorController = require('../controllers/controller_author');
const upload = require('../helpers/upload');
const {
    is_Admin,
    is_Staff,
    is_User
} = require('../middleware/auth_middleware');

router.get('/', is_User, authorController.getAllAuthor);
router.post('/', is_Staff, upload.none(), authorController.addAuthor);
router.put('/:id', is_Staff, upload.none(), authorController.updateAuthor);
router.delete('/:id', is_Admin, authorController.deleteAuthor);
router.get('/search', is_User, authorController.searchAuthor);

module.exports = router;