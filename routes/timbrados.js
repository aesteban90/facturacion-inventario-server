const express = require('express');
const { getTimbradosAll, getTimbradoActivo, postTimbradoCreate, postTimbradoUpdate, postTimbradoUpdateEstado, postTimbradoDelete, getTimbrado } = require('../controller/timbrados.js');
const router = express.Router();

router.get('/', getTimbradosAll);
router.get('/:id', getTimbrado);
router.get('/activado/:id', getTimbradoActivo);
router.post('/add', postTimbradoCreate);
router.post('/update/:id', postTimbradoUpdate)
router.post('/activar/:id', postTimbradoUpdateEstado)
router.delete('/:id', postTimbradoDelete)

module.exports = router;