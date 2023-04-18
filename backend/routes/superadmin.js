const express = require('express');
const { Admin, validateUser } = require('../models/userModel');
const router = express.Router();

//dealing with get requests
router.get('/admins/:email', async (req, res) => {
    const admin = await Admin.find({ email: req.params.email });
    if (!admin) return res.status(404).send('The admin with the given email was not found.');
    res.send(admin);
})

router.get('/admins', async (req, res) => {
    const admin = await Admin.find().sort('name');
    res.send(admin)
})

//dealing with post requests
router.post('/admins', async (req, res) => {
    const { error } = validateUser(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const admin = new Admin(req.body);
    try {
        await admin.save();
        res.send(admin);
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with put requests
router.put('/admins/:email', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try
    {
        const adminCollection = await Admin.find({email:req.params.email});
        if (!adminCollection || adminCollection.length==0) return res.status(404).send('The admin with the given email was not found.');
        
        //just getting first result; doesn't matter as email is unique and there would be one or zero record always
        const admin = adminCollection[0];
        for(let key in req.body){
            admin[key]=req.body[key];
        }
        const result = await admin.save();
        console.log(result);
        res.send(result);
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err);
    }
});

//dealing with delete requests
router.delete('/admins/:email', async (req, res) => {
    const result = await Admin.deleteOne({email:req.params.email});  
    if (!result) return res.status(404).send('The admin with the given email was not found.');  
    res.send(result);
});

module.exports = router;    