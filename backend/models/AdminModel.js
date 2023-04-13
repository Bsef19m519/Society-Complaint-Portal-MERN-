const mongoose = require("mongoose");
const joi = require('joi');

const adminSchema = mongoose.Schema({
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
        unique:true
    },
    address: {
        type: String,    
        required:true
    },
    cnic: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength:8,
        maxLength:30

    },
})

function validateAdmin(admin) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        phone: joi.number().required(),
        address:joi.string().required().max(50),
        cnic:joi.number().required().max(13)
    });
    return schema.validate(admin);
}

const Admin = new mongoose.model("Admin", adminSchema);
module.exports.Admin=Admin;
module.exports.validateAdmin=validateAdmin;
