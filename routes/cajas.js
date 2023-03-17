const express = require('express');
const { getCajasAll, getCajasAllEstado, postCajaCreate, postCajaUltimoVuelto, postCajaUpdate, postCajaDelete, getCaja } = require('../controller/cajas.js');
const router = express.Router();

router.get('/', getCajasAll);
router.get('/estado/:estado', getCajasAllEstado);
router.get('/:id', getCaja);
router.post('/add', postCajaCreate);
router.post('/ultimoVuelto', postCajaUltimoVuelto);
router.post('/update/:id', postCajaUpdate)
router.delete('/:id', postCajaDelete)

module.exports = router;