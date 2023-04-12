const express = require('express');
const superAdmin = require('../routes/superadmin');

module.exports = function(app) {    //the method will be called in index.js
  app.use(express.json());
  app.use('/api/superadmin', superAdmin);
}