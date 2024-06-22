const express = require('express');
const { isAuthenticated } = require('../utils/auth-middleware');
const { createRegistrationAndGetJWT, createAdminRegistrationAndGetJWT, updateRegistration } = require('../controllers/registration-controller');
const router = express.Router();

router.post('/', createRegistrationAndGetJWT);
router.put('/:login_id/update',isAuthenticated, updateRegistration);

// register with an admin role
router.post('/admin', createAdminRegistrationAndGetJWT);

module.exports = router;
