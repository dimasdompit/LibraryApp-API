const express = require('express');
const router = express.Router();
const bookController = require('../controllers/controller_book');
const upload = require('../helpers/upload')
const {
    is_Admin,
    is_User,
    is_Staff
} = require('../middleware/auth_middleware');

router.get('/', is_User, bookController.showAllBooks);
router.post('/', is_Staff, upload.single('image'), bookController.addBooks);
router.put('/:id', is_Staff, upload.single('image'), bookController.updateBooks);
router.put('/borrow/:id', is_User, bookController.borrowBooks);
router.put('/return/:id', is_User, bookController.returnBooks);
router.delete('/:id', is_Admin, bookController.deleteBooks);

module.exports = router;