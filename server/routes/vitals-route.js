const express = require('express');
const router = express.Router();
const { fetchVitals, addFavoriteVital, recordVital } = require('../controllers/vitals-controller');
const { isAuthenticated } = require('../utils/auth-middleware');

// get vitals for any visitor
router.get('/', fetchVitals);

// a registered login can record a vital
router.post('/:login_id/', isAuthenticated, recordVital);

// only a registered login can add a vital as favorite for tracking
router.post('/:login_id/favorite-vitals', isAuthenticated, addFavoriteVital);



module.exports = router;