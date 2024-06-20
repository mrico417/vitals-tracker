const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/vitals_tracker_db');

const createTables = async() => {
    try {
        await client.connect();
        console.log(`Connected to database...`);

        const sql = 
            `
                DROP TABLE IF EXISTS record_vital CASCADE;
                DROP TABLE IF EXISTS login_vital_favorites CASCADE;
                DROP TABLE IF EXISTS login CASCADE;
                DROP TABLE IF EXISTS vital CASCADE;

                CREATE TABLE vital (
                    id UUID PRIMARY KEY,
                    vital_name VARCHAR(150) UNIQUE NOT NULL
                );
                CREATE TABLE login (
                    id UUID PRIMARY KEY,
                    login_name VARCHAR(150),
                    email VARCHAR(255),
                    password VARCHAR,
                    role_name VARCHAR(50) NOT NULL,
                    is_active BOOLEAN DEFAULT true NOT NULL,
                    created TIMESTAMP DEFAULT now(),
                    updated TIMESTAMP DEFAULT now()
                );
                CREATE TABLE login_vital_favorites (
                    id UUID PRIMARY KEY,
                    login_id UUID REFERENCES login(id) NOT NULL,
                    vital_id UUID REFERENCES vital(id) NOT NULL,
                    CONSTRAINT unique_login_id_vital_id UNIQUE(login_id,vital_id)
                );
                CREATE TABLE record_vital (
                    id UUID PRIMARY KEY,
                    login_id UUID REFERENCES login(id),
                    vital_id UUID REFERENCES vital(id),
                    value DECIMAL NOT NULL,
                    created TIMESTAMP DEFAULT now() 
                );
                
            `
        ;

        await client.query(sql);
        console.log("Created tables...")
        return;
        
    } catch (error) {
        console.log(error);
        
    }
};

(async()=>{
    await createTables()
})()


module.exports = {
    client
};
