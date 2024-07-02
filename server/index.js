const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const { createTables } = require('./db')
const { seedVitals } = require('./controllers/vitals-controller');

//for deployment only, serving built react app
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

app.use(express.json());
app.use(require('morgan')('dev'));
app.use('/api/auth/register',require('./routes/registration-route'));
app.use('/api/auth/login', require('./routes/login-route'));
app.use('/api/vitals', require('./routes/vitals-route'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message || err });
});

const init = async () => {
    
    console.log(`Created tables...`, await createTables());
    
    
    console.log(`Seeded vitals...`, await seedVitals())

    app.listen(port,()=> {
        console.log(`App is listening on port ${port}`);
        
    });

};

init();
    




