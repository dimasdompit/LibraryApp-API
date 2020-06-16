const express = require('express');
const router = express.Router();
const genreController = require('../controllers/controller_genre');
const upload = require('../helpers/upload');
const {
    is_Admin,
    is_Staff,
    is_User
} = require('../middleware/auth_middleware');

router.get('/', is_User, genreController.getAllGenre);
router.post('/', is_Staff, upload.none(), genreController.addGenre);
router.put('/:id', is_Staff, upload.none(), genreController.updateGenre);
router.delete('/:id', is_Admin, genreController.deleteGenre);

router.get('/search', is_User, genreController.searchGenre);

module.exports = router;