const express = require('express');
const { getCajasConfigAll, postCajaConfigCreate, postCajaConfigUpdate, postCajaConfigDelete, getCajaConfig } = require('../controller/cajas-configuraciones.js');
const router = express.Router();

router.get('/', getCajasConfigAll);
router.get('/:id', getCajaConfig);
router.post('/add', postCajaConfigCreate);
router.post('/update/:id', postCajaConfigUpdate)
router.delete('/:id', postCajaConfigDelete)

module.exports = router;