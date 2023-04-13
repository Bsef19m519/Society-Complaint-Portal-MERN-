const mongoose = require("mongoose");
const joi = require('joi');


const superAdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    
    },
    email: {
        type: String,
        unique: true,
        required: true,
        email: true

    },
    phone: {
        type: Number,
        required: true,

    },
    
    cnic: {
        type: Number,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true,
        minLength:8,
        maxLength:30
        
    },


})
function validateSuperAdmin(superAdmin) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        phone: joi.number().required(),
        cnic:joi.number().required().max(13),
        
    });
    return schema.validate(superAdmin);
}


const SuperAdmin = new mongoose.model("SuperAdmin", superAdminSchema);
module.exports.SuperAdmin=SuperAdmin;

module.exports.validateSuperAdmin=validateSuperAdmin;
