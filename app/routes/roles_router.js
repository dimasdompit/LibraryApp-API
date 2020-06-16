const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/controller_roles');
const upload = require('../helpers/upload');

router.get('/', rolesController.getAllRoles);
router.post('/', upload.none(), rolesController.addRoles);
router.put('/:id', upload.none(), rolesController.updateRoles);
router.delete('/:id', rolesController.deleteRoles);

module.exports = router;