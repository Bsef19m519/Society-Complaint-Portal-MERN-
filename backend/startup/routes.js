const express = require("express");
const cors = require("cors");

const auth = require("../routes/auth");
const user = require("../routes/user");
const complaint = require("../routes/complaint");

/**
 * The method uses server application to
 * call all routes
 * @param {*} app indicates express server
 */
module.exports = function (app) {
  //the method will be called in index.js
  app.use(cors({ origin: "http://localhost:3000" })); //to allow cross-origin requests
  app.use(express.json());

  app.use("/api/auth", auth);
  app.use("/api/users", user);
  app.use("/api/complaints", complaint);
};
