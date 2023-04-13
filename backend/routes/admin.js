const express = require('express');
const { Resident, validateUser } = require('../models/userModel');
const router = express.Router();

//dealing with get requests
router.get('/residents/:email', async (req, res) => {
    const resident = await Resident.find({ email: req.params.email });
    if (!resident) return res.status(404).send('The resident with the given email was not found.');
    res.send(resident);
})

router.get('/residents', async (req, res) => {
    const resident = await Resident.find().sort('name');
    res.send(resident)
})

//dealing with post requests
router.post('/residents', async (req, res) => {
    const { error } = validateUser(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const resident = new Resident(req.body);
    try {
        await resident.save();
        res.send(resident);
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with put requests
router.put('/residents/:id', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try
    {
        const resident = await Resident.findByIdAndUpdate(req.params.id, req.body , { new: true });
        if (!resident) return res.status(404).send('The resident with the given ID was not found.');
        res.send(resident);
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with delete requests
router.delete('/residents/:id', async (req, res) => {
    const resident = await Resident.findByIdAndRemove(req.params.id);  
    if (!resident) return res.status(404).send('The resident with the given ID was not found.');  
    res.send(resident);
});

module.exports = router;    