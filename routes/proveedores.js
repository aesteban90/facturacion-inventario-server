const express = require('express');
const { getProveedoresAll, postProveedorCreate, postProveedorUpdate, postProveedorDelete, getProveedor } = require('../controller/proveedores.js');
const router = express.Router();

router.get('/', getProveedoresAll);
router.get('/:id', getProveedor);
router.post('/add', postProveedorCreate);
router.post('/update/:id', postProveedorUpdate)
router.delete('/:id', postProveedorDelete)

module.exports = router;