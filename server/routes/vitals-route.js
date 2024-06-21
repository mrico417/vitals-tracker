const express = require('express');
const router = express.Router();
const { fetchVitals, addFavoriteVital } = require('../controllers/vitals-controller');
const { isAuthenticated } = require('../utils/auth-middleware');

// get vitals for any visitor
router.get('/', fetchVitals);

// only a registered login can add a vital as favorite for tracking
router.post('/:login_id/vital', isAuthenticated, addFavoriteVital);



module.exports = router;