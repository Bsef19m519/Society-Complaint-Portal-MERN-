const mongoose = require('mongoose');

module.exports = function() {
  const db = "mongodb://127.0.0.1/society-complaint-portal";
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err)=> console.log(`Could not connect to mongodb...\n${err}`));
}