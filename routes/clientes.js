const express = require('express');
const { getClientesAll, postClienteCreate, postClienteUpdate, postClienteDelete, getCliente } = require('../controller/clientes.js');
const router = express.Router();

router.get('/', getClientesAll);
router.get('/:id', getCliente);
router.post('/add', postClienteCreate);
router.post('/update/:id', postClienteUpdate)
router.delete('/:id', postClienteDelete)

module.exports = router;