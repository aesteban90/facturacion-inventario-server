const express = require('express');
const { getCajasAll, postCajaCreate, postCajaUpdate, postCajaDelete, getCaja } = require('../controller/cajas.js');
const router = express.Router();

router.get('/', getCajasAll);
router.get('/:id', getCaja);
router.post('/add', postCajaCreate);
router.post('/update/:id', postCajaUpdate)
router.delete('/:id', postCajaDelete)

module.exports = router;