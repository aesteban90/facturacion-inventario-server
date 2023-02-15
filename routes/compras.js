const express = require('express');
const { getComprasAll, postCompraCreate, postCompraUpdate, postCompraDelete, getCompra } = require('../controller/compras.js');
const router = express.Router();

router.get('/', getComprasAll);
router.get('/:id', getCompra);
router.post('/add', postCompraCreate);
router.post('/update/:id', postCompraUpdate)
router.delete('/:id', postCompraDelete)

module.exports = router;