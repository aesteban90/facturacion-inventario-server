const express = require('express');
const { autenticar } = require('../controller/autenticar.js');
const router = express.Router();

router.post('/', autenticar);

module.exports = router;