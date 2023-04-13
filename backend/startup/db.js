const mongoose = require('mongoose');

/**
 * The method connects server to the database.
 */
module.exports = function() {
  const db = "mongodb://127.0.0.1/societyComplaintPortalDB";
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err)=> console.log(`Could not connect to MongoDB...`));
}