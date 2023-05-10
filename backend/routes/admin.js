const express = require('express');
const _ = require('lodash');
const { Resident, validateUser } = require('../models/userModel');
const router = express.Router();

//dealing with get requests
router.get('/residents/:email', async (req, res) => {
    const resident = await Resident.findOne({ email: req.params.email });
    if (!resident) return res.status(404).send('The resident with the given email was not found.');
    res.send(_.pick(resident, ['_id','name', 'email', 'cnic','phone','address']));
})

router.get('/residents', async (req, res) => {
    const resident = await Resident.find().sort('name');
    res.send(_.pick(resident, ['_id','name', 'email', 'cnic','phone','address']));
})

//dealing with post requests
router.post('/residents', async (req, res) => {
    const { error } = validateUser(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const resident = new Resident(_.pick(req.body,['name', 'email', 'password', 'cnic','phone','address']));
    try {
        await resident.save();
        res.send(_.pick(resident, ['_id','name', 'email', 'cnic','phone','address']));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with put requests
router.put('/residents/:email', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try
    {
        const resident = await Resident.findOne({email:req.params.email});
        if (!resident) return res.status(404).send('The resident with the given email was not found.');
        resident.set(_.pick(req.body,['name', 'email', 'password', 'cnic','phone','address']));
        res.send(_.pick(resident, ['_id','name', 'email', 'cnic','phone','address']));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with delete requests
router.delete('/residents/:email', async (req, res) => {
    
    const resident = await Resident.findOne({email:req.params.email});
    if (!resident) return res.status(404).send('The resident with the given email was not found.');
    await Resident.deleteOne({email:req.params.email});
    res.send(_.pick(resident, ['_id','name', 'email', 'cnic','phone','address']));
});

module.exports = router;    