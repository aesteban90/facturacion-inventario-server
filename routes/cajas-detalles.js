const express = require('express');
const { getCajasDetallesAll, getCajasDetallesEstados, postCajaDetalleCreate, postCajaDetalleUpdate, postCajaDetalleDelete, getCajaDetalle } = require('../controller/cajas-detalles.js');
const router = express.Router();

router.get('/', getCajasDetallesAll);
router.get('/:id', getCajaDetalle);
router.get('/estado/:caja/:estado', getCajasDetallesEstados)
router.post('/add', postCajaDetalleCreate);
router.post('/update/:id', postCajaDetalleUpdate)
router.delete('/:id', postCajaDetalleDelete)

module.exports = router;