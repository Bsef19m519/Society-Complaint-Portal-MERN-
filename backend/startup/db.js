const mongoose = require("mongoose");

/**
 * The method connects server to the database.
 */
module.exports = function () {
  const db =
    // "mongodb://127.0.0.1/societyComplaintPortalDB";
    "mongodb+srv://dbUser:complaintPortal2023@cluster0.l0ahg1e.mongodb.net/societyComplaintPortalDB";
  mongoose
    .connect(db)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch((err) => console.log(err));
};
