const express = require('express');
const { isAuthenticated } = require('../utils/auth-middleware');
const { createRegistrationAndGetJWT, createAdminRegistrationAndGetJWT, updateRegistration } = require('../controllers/registration-controller');
const router = express.Router();

router.post('/', createRegistrationAndGetJWT);
router.get('/me',isAuthenticated, (req,res,next)=>{
    try {
        if(!req.login){
            const authErr = Error("Not authorized");
            authErr.status = 401;
            throw authErr;
        }
        res.send(req.login);
    } catch (error) {
        next(error)
    }
});
router.put('/:login_id/update',isAuthenticated, updateRegistration);

// register with an admin role
router.post('/admin', createAdminRegistrationAndGetJWT);

module.exports = router;
