const express = require('express');
const { getCajasDetallesAll, getCajasDetallesEstados, getByFacturacion,  getProductsMasVendidos, getProductsTotalesPorMes, postCajaDetalleImportar, postCajaDetalleUpdateFactura, postCajaDetalleCreate, postCajaDetalleUpdate, postCajaDetalleDelete, getCajaDetalle } = require('../controller/cajas-detalles.js');
const router = express.Router();

router.get('/', getCajasDetallesAll);
router.get('/:id', getCajaDetalle);
router.get('/topMasVendidos/:date', getProductsMasVendidos);
router.get('/totalesPorMes/:date', getProductsTotalesPorMes);
router.get('/facturas/:id', getByFacturacion);
router.get('/estado/:caja/:estado', getCajasDetallesEstados);
router.post('/update-factura', postCajaDetalleUpdateFactura);
router.post('/add', postCajaDetalleCreate);
router.post('/importar', postCajaDetalleImportar);
router.post('/update/:id', postCajaDetalleUpdate)
router.delete('/:id', postCajaDetalleDelete)

module.exports = router;