const mongoose = require("mongoose");
const joi = require('joi');

/**
 * The object represents a common schema 
 * for super admin, admin and residents.
 * All fields are validated by using
 * Mongoose according to the business logic. 
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        email: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength:8,
        maxLength:30
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
        length: 11,
        unique:true
    },
    cnic: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
        length: 13,
        unique: true,
    },
    address: {
        type: String,    
        required:true,
        maxLength: 50
    },
})

/**
 * The function validates user object by
 *  using Joi according to business rules. 
 * @param {Object} user indicates user
 *  to be validated
 * @returns an object having two properties;
 * value and error
 */
function validateUser(user){
    const schema = joi.object({
        name: joi.string().max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        phone: joi.string().length(11).pattern(/^[0-9]+$/).required(),
        cnic:joi.string().length(13).pattern(/^[0-9]+$/).required(), 
        address:joi.string().required().max(50),
    });
    return schema.validate(user);
}





//exporting modules
module.exports.SuperAdmin=new mongoose.model("superAdmins", userSchema);
module.exports.Admin=new mongoose.model("admins", userSchema);
module.exports.Resident=new mongoose.model("residents", userSchema);
module.exports.validateUser=validateUser;
