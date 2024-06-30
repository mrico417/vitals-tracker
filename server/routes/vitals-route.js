const express = require('express');
const router = express.Router();
const { fetchVitals, addFavoriteVital, recordVital, fetchRecordedVitalsByLoginId, createVital, deleteRecordedVital } = require('../controllers/vitals-controller');
const { isAuthenticated, isAdminAuthenticated } = require('../utils/auth-middleware');

// get vitals for any visitor
router.get('/', fetchVitals);

// a registered login can record a vital
router.post('/login/:login_id', isAuthenticated, recordVital);

// get recent recorded vitals by registered login_id
router.get('/:login_id/', isAuthenticated, fetchRecordedVitalsByLoginId);

// registered login deletes a recorded vital
router.delete('/login/:login_id/recordedvital/:rv_id',isAuthenticated, deleteRecordedVital)

// only a registered login can add a vital as favorite for tracking
router.post('/:login_id/favorite-vitals', isAuthenticated, addFavoriteVital);

// only a data-admin role can add new vitals to the database
router.post('/admin/:login_id', isAdminAuthenticated, createVital);



module.exports = router;