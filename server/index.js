const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require('morgan')('dev'));
app.use('/api/auth/register',require('./routes/registration-route'));
app.use('/api/auth/login', require('./routes/login-route'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message || err });
});
    
app.listen(port,()=> {
    console.log(`App is listening on port ${port}`);
});




