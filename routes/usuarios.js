const express = require('express');
const { getUsuariosAll, postUsuarioCreate, postUsuarioUpdate, postUsuarioDelete, getUsuario } = require('../controller/usuarios.js');
const router = express.Router();

router.get('/', getUsuariosAll);
router.get('/:id', getUsuario);
router.post('/add', postUsuarioCreate);
router.post('/update/:id', postUsuarioUpdate);
router.delete('/:id', postUsuarioDelete);

module.exports = router;