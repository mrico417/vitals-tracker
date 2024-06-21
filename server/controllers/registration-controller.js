const {v4:uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { client } = require('../db');
const { jwtSecret } = require('../secrets');

const createRegistrationAndGetJWT = async(req,res,next) => {

    try {
        if(!req.body.login_name || !req.body.email || !req.body.password){
            const registrationErr = Error("Invalid registration");
            registrationErr.status = 401;
            throw registrationErr;
        }

        const { login_name, email, password } = req.body;

        const sql = `
                INSERT INTO login (id,login_name,email,password,role_name)
                VALUES ($1,$2,$3,$4,'app-user')
                RETURNING id, role_name;
            `
        ;

        const response = await client.query(sql,[uuidv4(),login_name,email,await bcrypt.hash(password,3)]);
        if(!response.rows){
            const dbErr = Error("Unable to create registration");
            dbErr.status = 401;
            throw dbErr;
        }
        const { id, role_name } = response.rows[0];
        console.log(id);
        
        res.send({
            token: jwt.sign({id,role_name},jwtSecret)
        });

    } catch (error) {
        console.log(error);
        next(error);
        
    }
};

const updateRegistration = async(req,res,next) => {
    try {

        if(!req.login.id !== req.params.login_id){
            const authErr = Error('Not authorized');
            authErr.status = 401;
            throw authErr;
        }


        if(!req.body.login_name || !req.body.email || !req.body.password){
            const updateErr = Error("Invalid data");
            updateErr.status = 401;
            throw updateErr;
        }

        const {login_name,email,password} = req.body;

        if(req.params.login_id !== req.login.id){
            const authErr = Error('Not authorized')
            authErr.status = 401;
            throw authErr;
        }

        const sql= `
                UPDATE login 
                SET login_name=$1, email=$2, password=$3, updated=now()
                WHERE id=$4
                RETURNING login_name, email, updated;
            `
        ;

        const response = await client.query(sql,[login_name,email,await bcrypt.hash(password,3),req.login.id]);
        res.send(response.rows[0]);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createRegistrationAndGetJWT,
    updateRegistration
}
