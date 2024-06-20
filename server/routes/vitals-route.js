const express = require('express');
const router = express.Router();
const { fetchVitals } = require('../controllers/vitals-controller');

router.get('/', fetchVitals);


module.exports = router;