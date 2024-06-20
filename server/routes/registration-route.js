const express = require('express');
const { isAuthenticated } = require('../utils/auth-middleware');
const { createRegistrationAndGetJWT,updateRegistration } = require('../controllers/registration-controller');
const router = express.Router();

router.post('/', createRegistrationAndGetJWT);
router.put('/:login_id/update',isAuthenticated, updateRegistration);

module.exports = router;
