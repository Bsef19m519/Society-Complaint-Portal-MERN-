const mongoose = require("mongoose");

const SuperAdminSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    
    },
    Email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true

    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
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

const SuperAdminCollection = new mongoose.model("SuperAdminCollection", SuperAdminSchema);
module.exports=SuperAdminCollection;
