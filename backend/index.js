const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express'); //importing express
const app = express();              //creating express application

require('./startup/routes')(app);   //importing routes and calling it
require('./startup/db')();      //connecting to database

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const port = process.env.PORT || 3001;  //defining port

//running server on specified port
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

module.exports = server;    //exporting module