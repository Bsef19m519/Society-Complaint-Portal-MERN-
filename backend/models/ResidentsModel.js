const mongoose = require("mongoose");


const ResidentSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true


    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true,
        minLength:11

    },
    Address: {
        type: String,
        required: true,
    },
    CNIC: {
        type: Number,
        required: true,
        unique: true

    },
    Password: {
        type: String,
        required: true,
        unique: true,
        minLength:11,
        maxLength:20

    },


})

const ResidentsCollection = new mongoose.model("ResidentsCollection", ResidentSchema);
module.exports=ResidentsCollection;