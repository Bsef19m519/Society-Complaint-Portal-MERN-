const express = require('express'); //importing express
const app = express();              //creating express application

require('./startup/routes')(app);   //importing routes

const port = process.env.PORT || 3000;  //defining port

//running server on specified port
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

module.exports = server;    //exporting module