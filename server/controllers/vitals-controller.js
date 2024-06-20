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


module.exports = {
    seedVitals, //called only at ../index.js
    fetchVitals
    
}
