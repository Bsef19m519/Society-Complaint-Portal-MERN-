const auth = require('../middleware/auth');
const express = require('express');
const _ = require('lodash');
const { Complaint, validateComplaint } = require('../models/complaintModel');
const {User} = require('../models/userModel');
const router = express.Router();

//dealing with post requests
router.post('/', auth, async (req, res) => {
    const { error } = validateComplaint(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const complainer = await User.findById(req.body.complainer);  //finding complainer
    if(!complainer) return res.status(400).send("Resident not found!");

    const complaint = new Complaint(_.pick(req.body,['complainer','complaintType','description','complaintStatus']));
    try {
        await complaint.save();
        res.send(complaint);
        // res.send(_.merge(
        //     {
        //         complainer: _.pick(complainer,['_id','name','email','phone','address'])
        //     },
        //    _.pick(complaint,['_id','complaintType','description','complaintStatus','generationDate'])
        // ));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

router.get('/', auth, async (req, res) => {
    const complaint = await Complaint.find()
                                    .sort('_id')
                                    .populate('complainer', '-password -role -__v')
                                    .select('-__v');
    res.send(complaint);
})

router.get('/me', auth, async (req,res) => {
    const complaint = await Complaint.find({'complainer':req.user._id})
                                    .sort('_id')
                                    .select('-__v -complainer');
    res.send(complaint);
})

router.get('/:complaintStatus', auth, async (req, res) => {
    if(req.params.complaintStatus!='pending' && req.params.complaintStatus!='acknowledged'
    && req.params.complaintStatus!='resolved' && req.params.complaintStatus!='rejected')
        return res.status(400).send('invalid \'complaintStatus\' value')

    const complaint = await Complaint.find({complaintStatus:req.params.complaintStatus})
                                    .sort('_id')
                                    .populate('complainer', '-password -role -__v')
                                    .select('-__v');
    res.send(complaint);
})

router.get('/me/:complaintStatus', auth, async (req, res) => {
    if(req.params.complaintStatus!='pending' && req.params.complaintStatus!='acknowledged'
    && req.params.complaintStatus!='resolved' && req.params.complaintStatus!='rejected')
        return res.status(400).send('invalid \'complaintStatus\' value')

    const complaint = await Complaint.find({'complainer':req.user._id , complaintStatus:req.params.complaintStatus})
                                    .sort('_id')
                                    .populate('complainer', '-password -role -__v')
                                    .select('-__v');
    res.send(complaint);
})

router.put('/:id', auth, async(req,res) => {
    if(!req.body.complaintStatus)
        return res.status(400).send("'complaintStatus' attribute is required in request body");

    try{
        let complaint = await Complaint.findById(req.params.id);
        if(!complaint) return res.status(400).send("No complaint is found for this id");
        if(req.body.complaintStatus=='acknowledged')
        {
            if(complaint.complaintStatus != 'pending')
                return res.status(400).send("complaint is not in pending state");
            complaint.acknowledgeDate= Date.now();
        }
        else if(req.body.complaintStatus=='resolved' || req.body.complaintStatus=='rejected')
        {
            if(complaint.complaintStatus != 'acknowledged')
                return res.status(400).send("complaint is not in acknowledged state");
            complaint.finalizeDate= Date.now();
        }
        else return res.status(400).send("invalid value for 'complaintStatus' attribute");

        complaint.complaintStatus=req.body.complaintStatus;
        await complaint.save();
        res.send(complaint);
    }catch(err){
        res.status(400).send(err.message);
        console.log(err.message);
    }
})

module.exports=router;