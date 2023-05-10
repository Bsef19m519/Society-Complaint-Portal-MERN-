const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const { Resident} = require('../models/userModel');
const router = express.Router();

//dealing with post requests
router.post('/', async (req, res) => {
    const { error } = validate(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    let resident = await Resident.findOne({email:req.body.email});
    if(!resident) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, resident.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = resident.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required()
    });
    return schema.validate(req);
}

module.exports = router;   