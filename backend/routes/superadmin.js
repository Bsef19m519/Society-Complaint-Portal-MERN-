const express = require('express');
const {Admin, validateAdmin} = require('../models/adminModel');
const router = express.Router();

//dealing with get requests
router.get('/admin/:email', async(req,res)=>{
    try{
        const admin = await Admin.find({email:req.params.email});
        if (!admin)
            res.status(404).send('The admin with the given email was not found.');
        else
            res.send(admin);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
})
router.get('/admins', async(req,res)=>{
    try{
        const admin = await AdminCollection.find().sort('name');
        res.send(admin)
    }
    catch(err)
    {
        res.status(500).send(err.details[0].message);
    }
})



//dealing with post requests
router.post('/admin', async(req,res)=>{
    try{
        const { error } = validateAdmin(req.body); 
        if (error)return res.status(400).send(error.details[0].message);
        
        const admin = new Admin(req.body);
        await admin.validate();
        await admin.save();
        res.send(admin);
    }
    catch(err)
    {
        res.status(500).send(err.message);
        console.log(err.message);
    }
});
module.exports=router;
    