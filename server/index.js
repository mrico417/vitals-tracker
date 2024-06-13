const { createTables } = require('./db');


// setup express app
const express = require('express');
const app = express();

// allow app to accept json payload
app.use(express.json());

// enable debugging with morgan for dev environment
app.use(require('morgan')('dev'));

// start the express app
const init = async () => {

    // declare port to listen on
    const port = process.env.PORT || 4001;

    app.listen(port, ()=> {
        console.log("App is listening on port", port);
    })

    await createTables();

};

init();
