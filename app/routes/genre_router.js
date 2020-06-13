const express = require('express');
const router = express.Router();
const genreController = require('../controllers/controller_genre');
const upload = require('../helpers/upload');

router.get('/', genreController.getAllGenre);
router.post('/', upload.none(), genreController.addGenre);
router.put('/:id', upload.none(), genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

router.get('/search', genreController.searchGenre);

module.exports = router;