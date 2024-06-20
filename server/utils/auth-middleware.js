const { client } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets');

const authenticate = async (req,res,next) => {
    try {
        
        if(!req.body.login_name || !req.body.password){
            const authErr = Error('Invalid login');
            authErr.status = 401;
            throw authErr;
        }

        const { login_name, password } = req.body;

        const sql = `
            SELECT id, password, role_name 
            FROM login
            WHERE login_name=$1`
        ;

        const response = await client.query(sql,[login_name]);
        if(!response.rows.length){
            const dbErr = Error('Invalid login');
            dbErr.status = 401;
            throw dbErr;
        }
        const login = response.rows[0];

        const checkedPassword = await bcrypt.compare(password,login.password);
        if(!checkedPassword){
            const pwdErr = Error('Invalid login');
            pwdErr.status = 401;
            throw pwdErr;
        }
        console.log(login.id);

        res.send({
            token : jwt.sign({ id: login.id, role_name:login.role_name }, jwtSecret)
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const isAuthenticated = async(req,res,next) => {
    try {
        if(!req.headers.authorization)
        {
            const authErr = Error("Invalid authorization.");
            authErr.status = 401;
            throw authErr;
        }
        const [_,token] = req.headers.authorization.split(' ');
        req.login = await fetchLoginByToken(token);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const fetchLoginByToken = async (token) =>{
    let loginID;

    try {

        const tokenDecoded = jwt.verify(token,jwtSecret);
        loginID = tokenDecoded.id;
    } catch(ex) {
        const tokenErr = Error("Not authorized");
        tokenErr.status = 401;
        throw tokenErr

    }
    
    const sql=`
        SELECT id, email
        FROM login
        WHERE id=$1;`
    ;
    const response = await client.query(sql,[loginID]);

    if(!response.rows.length){
        const dbErr = Error("Not authorized");
        tokenErr.status = 401;
        throw tokenErr;
    }

    return response.rows[0];

};



module.exports = {
    authenticate,
    isAuthenticated
}
