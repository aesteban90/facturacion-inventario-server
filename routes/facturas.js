const express = require('express');
const { getFacturasAll, postFacturaCreate } = require('../controller/facturas.js');
const router = express.Router();

router.get('/', getFacturasAll);
router.post('/add', postFacturaCreate);

module.exports = router;