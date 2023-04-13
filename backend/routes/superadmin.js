const express = require('express');
const {Admin, validateUser} = require('../models/userModel');
const router = express.Router();

//dealing with get requests
router.get('/admins/:email', async(req,res)=>{
    const admin = await Admin.find({email:req.params.email});
    if (!admin) return res.status(404).send('The admin with the given email was not found.');
    res.send(admin);
})

router.get('/admins', async(req,res)=>{
    const admin = await Admin.find().sort('name');
    res.send(admin)
})



//dealing with post requests
router.post('/admins', async(req,res)=>{
    const { error } = validateUser(req.body); //joi validation
    if (error)return res.status(400).send(error.details[0].message);
    
    const admin = new Admin(req.body);
    try{
        await admin.save();
        res.send(admin);
    }
    catch(err)
    {
        res.status(500).send(err.message);
        console.log(err.message);
    }
    finally{
        console.log("still happended");
    }
});
module.exports=router;
    