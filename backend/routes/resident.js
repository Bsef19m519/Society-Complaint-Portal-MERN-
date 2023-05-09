const express = require('express');
const { Complaint, validateComplaint } = require('../models/complaintModel');
const router = express.Router();

//dealing with post requests
router.post('/complaints', async (req, res) => {
    const { error } = validateComplaint(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message + " JOI error");

    const complaint = new Complaint(req.body);
    try {
        await complaint.save();
        res.send(complaint);
    }
    catch (err) {
        res.status(400).send(err.message+" mongoose error");
        console.log(err.message);
    }
});


module.exports=router;