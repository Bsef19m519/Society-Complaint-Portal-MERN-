const express = require('express');
const cors = require('cors');
const superAdmin = require('../routes/superAdmin');
const admin = require('../routes/admin');

/**
 * The method uses server application to
 * call all routes
 * @param {*} app indicates express server
 */
module.exports = function(app) {    //the method will be called in index.js
  app.use(cors({origin:'http://localhost:3001'}));    //to allow cross-origin requests
  app.use(express.json());
  
  app.use('/api/superadmin', superAdmin);
  app.use('/api/admin', admin);
}