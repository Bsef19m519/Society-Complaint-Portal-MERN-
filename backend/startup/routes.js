const express = require('express');
const cors = require('cors');
const admin = require('../routes/admin');
const complaintOfficer = require('../routes/complaintOfficer');
const resident = require('../routes/resident');
const auth = require('../routes/auth');

/**
 * The method uses server application to
 * call all routes
 * @param {*} app indicates express server
 */
module.exports = function(app) {    //the method will be called in index.js
  app.use(cors({origin:'http://localhost:3001'}));    //to allow cross-origin requests
  app.use(express.json());
  
  app.use('/api/admin', admin);
  app.use('/api/complaintOfficer', complaintOfficer);
  app.use('/api/resident', resident);
  app.use('/api/auth',auth);
}