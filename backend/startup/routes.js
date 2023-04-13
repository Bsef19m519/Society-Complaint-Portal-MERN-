const express = require('express');
const superAdmin = require('../routes/superAdmin');

/**
 * The method uses server application to
 * call all routes
 * @param {*} app indicates express server
 */
module.exports = function(app) {    //the method will be called in index.js
  app.use(express.json());
  
  app.use('/api/superadmin', superAdmin);
}