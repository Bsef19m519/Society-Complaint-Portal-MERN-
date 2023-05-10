const auth = require('../middleware/auth');
const express = require('express');
const _ = require('lodash');
const { Complaint, validateComplaint } = require('../models/complaintModel');
const {Resident} = require('../models/userModel');
const router = express.Router();

//dealing with post requests
router.post('/complaints', auth, async (req, res) => {
    const { error } = validateComplaint(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const complainer = await Resident.findById(req.body.complainerId);
    if(!complainer) return res.status(400).send("Resident not found!");

    const complaint = new Complaint(_.pick(req.body,['complainerId','complaintType','description','complaintStatus']));
    try {
        await complaint.save();
        res.send(_.merge(
        {
            complainer: _.pick(complainer,['_id','name','email','phone','address'])
        },
           _.pick(complaint,['_id','complaintType','description','complaintStatus','generationDate'])
        ));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});


module.exports=router;