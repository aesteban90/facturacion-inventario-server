const express = require('express');
const { getRolesAll } = require('../controller/roles.js');
const router = express.Router();

router.get('/', getRolesAll);

module.exports = router;