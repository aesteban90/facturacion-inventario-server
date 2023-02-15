const express = require('express');
const { getInventariosAll, postInventarioCreate, postInventarioUpdate, postInventarioDelete, getInventario } = require('../controller/inventarios.js');
const router = express.Router();

router.get('/', getInventariosAll);
router.get('/:id', getInventario);
router.post('/add', postInventarioCreate);
router.post('/update/:id', postInventarioUpdate)
router.delete('/:id', postInventarioDelete)
module.exports = router;