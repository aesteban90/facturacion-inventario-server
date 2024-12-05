const express = require('express');
const { getInventariosAll, postInventarioCreate, postInventarioStock, postInventarioUpdate, postInventarioDelete, getInventario, postUpdateAllIVA10 } = require('../controller/inventarios.js');
const router = express.Router();

router.get('/', getInventariosAll);
router.get('/:id', getInventario);
router.post('/add', postInventarioCreate);
router.post('/update-stock', postInventarioStock);
router.post('/update/:id', postInventarioUpdate)
router.post('/updateAllIva10', postUpdateAllIVA10)
router.delete('/:id', postInventarioDelete)

module.exports = router;