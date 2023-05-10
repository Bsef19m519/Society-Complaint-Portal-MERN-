const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Joi = require('joi');

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
        maxLength:1024
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

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(_.pick(this,['_id','name','email','phone','address']), config.get('jwtPrivateKey'));
    return token;
}

/**
 * The function validates user object by
 *  using Joi according to business rules. 
 * @param {Object} user indicates user
 *  to be validated
 * @returns an object having two properties;
 * value and error
 */
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        cnic:Joi.string().length(13).pattern(/^[0-9]+$/).required(), 
        address:Joi.string().required().max(50),
    });
    return schema.validate(user);
}





//exporting modules
module.exports.Admin=new mongoose.model("admins", userSchema);
module.exports.ComplaintOfficer=new mongoose.model("complaintOfficer", userSchema);
module.exports.Resident=new mongoose.model("residents", userSchema);
module.exports.validateUser=validateUser;
