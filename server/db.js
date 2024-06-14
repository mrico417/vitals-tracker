const {v4:uuidv4} = require('uuid');

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/vitals_tracker_db');


const createTables = async () => {
    try {
        await client.connect();
        console.log("Connected to database...");

        const sql = `
                DROP TABLE IF EXISTS record_vital;
                DROP TABLE IF EXISTS login_vital_favorites;
                DROP TABLE IF EXISTS vital;
                DROP TABLE IF EXISTS login;
                                                
                CREATE TABLE login(
                    id UUID PRIMARY KEY,
                    login_name VARCHAR(150) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR NOT NULL,
                    role_name VARCHAR(50) NOT NULL,
                    is_active BOOLEAN DEFAULT false,  
                    created TIMESTAMP DEFAULT now(),
                    updated TIMESTAMP DEFAULT now()
                );

                CREATE TABLE vital(
                    id UUID PRIMARY KEY,
                    vital_name VARCHAR(150) UNIQUE NOT NULL
                );

                CREATE TABLE login_vital_favorites(
                    id UUID PRIMARY KEY,
                    login_id UUID REFERENCES login(id),
                    vital_id UUID REFERENCES vital(id),
                    CONSTRAINT unique_login_id_vital_id UNIQUE(login_id,vital_id)
                );

                CREATE TABLE record_vital(
                    id UUID PRIMARY KEY,
                    login_id UUID REFERENCES login(id),
                    vital_id UUID REFERENCES vital(id),
                    value DECIMAL NOT NULL,
                    created TIMESTAMP DEFAULT now()
                );

            `
        ;

        await client.query(sql);
        console.log("Created database tables...");
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    client,
    createTables
};

