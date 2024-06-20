const express = require('express');
const { authenticate } = require('../utils/auth-middleware');
const router = express.Router();

router.post('/',authenticate);

module.exports = router;
