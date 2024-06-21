const {v4:uuidv4} = require('uuid');
const { client } = require('../db');

const seedVitals = async () => {
    try {
        const sql = `
                INSERT INTO vital(id,vital_name) VALUES('${uuidv4()}','Weight');
                INSERT INTO vital(id,vital_name) VALUES('${uuidv4()}','Body Temperature');
                INSERT INTO vital(id,vital_name) VALUES('${uuidv4()}','Heart Rate');
                INSERT INTO vital(id,vital_name) VALUES('${uuidv4()}','Blood Pressure Systolic');
                INSERT INTO vital(id,vital_name) VALUES('${uuidv4()}','Blood Pressure Diastolic');
            `
        ;

        return await client.query(sql);
        
    } catch (error) {
        console.log(error);
    }

};


// fetch all Vitals in ascending order
const fetchVitals = async (req,res,next) => {

    try {
        const sql = `
                SELECT id, vital_name 
                FROM vital
                ORDER BY vital_name ASC;
            `
        ;
        const response = await client.query(sql);

        res.send({
            data: response.rows
        });

    } catch (error) {
        next(error);
    }

};

// record a vital for registered login
const recordVital = async(req,res,next) => {
    try {
        if(req.login.id !== req.params.login_id){
            const authErr = Error("Not authorized");
            authErr.status = 401;
            throw authErr
        }

        if(!req.body.vital_id || !req.body.vital_value || !req.body.created_datetime){
            const payloadErr = Error("Invalid data");
            payloadErr.status = 401;
            throw payloadErr;
        }

        const { vital_id, vital_value , created_datetime } = req.body
        
        iso_created_datetime = new Date(created_datetime).toISOString();

        const sql = `
                INSERT INTO record_vital(id,login_id,vital_id,value,created)
                VALUES($1,$2,$3,$4,$5)
                RETURNING *;`
            
        const response = await client.query(sql,[uuidv4(),req.login.id,vital_id,vital_value,iso_created_datetime]);
        if(!response.rows){
            const dbErr = Error("Unable to record vital");
            dbErr.status = 401;
            throw dbErr;
        }

        res.send(response.rows[0]);

    } catch (error) {
        console.log(error)
        next(error);
    }
}

// add favorite Vital for login
const addFavoriteVital = async(req,res,next) => {
    try {
        if(req.login.id !== req.params.login_id){
            const authError = Error('Not authorized')
            authError.status = 401;
            throw authError;
        }

        if (!req.body.vital_id){
            const payloadErr = Error('Invalid data');
            payloadErr.status = 401;
            throw payloadErr;
        }

        const { vital_id } = req.body;

        const sql = `
            INSERT INTO login_vital_favorites(id,login_id,vital_id) 
            VALUES ($1,$2,$3)
            RETURNING *;`
        
        const response = await client.query(sql,[uuidv4(),req.login.id,vital_id]);
        if(!response.rows){
            const dbErr = Error('Unable to add vital as favorite');
            dbErr.status = 401;
            throw dbErr;
        }

        res.send(response.rows[0]);

    } catch (error) {
        console.log(error);
        next(error);
    }

};



module.exports = {
    seedVitals, //called only at ../index.js
    fetchVitals,
    recordVital,
    addFavoriteVital
    
}
