const mongoose = require("mongoose");
const joi = require('joi');

const { Resident, validateUser } = require('./userModel');

//Schema for Complaints 
const complaintSchema = mongoose.Schema({
    complaineeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userSchema',
        unique: true,
        required:true
    },
    complainerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userSchema',
        unique: true,
        required:true
    },
    description:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    proofId:{
        type: String,
        url: String,
        required:true,
        unique:true
        
        
    },
    generationDate:{
        type: Date,
        default: Date.now,
        required:true
    },
    complaintStatus :{
        type:String,
        enum:['accepted', 'rejected', 'acknowledged', 'pending']

    },
    acknowledgeDate:{
        type: Date,
        required:  function(){
            if (complaintStatus=="rejected"){return true};
            if (complaintStatus=="acknowledged"){return true}
            if (complaintStatus=="accepted"){return true}
        }
            
    },
    finalizeDate:
    {
        type: Date,
        required:  function( ){
            if (complaintStatus=="rejected"){return true}
        
            if (complaintStatus=="accepted") {return true}
        }
            

    }
})



function validateComplaint(complaint){
    const schema = joi.object({
        complaineeId: joi.string().required().unique(),
        complainerId: joi.string().unique().required(),
        description: joi.string().min(10).max(100).required(),
        proofId: joi.string().required().unique(),
        generationDate:joi.date().format("DD/MM/YYYY").required(),
        acknowledgeDate:joi.date().format("DD/MM/YYYY").required(),
        finalizeDate:joi.date().format("DD/MM/YYYY").required(),
        complaintStatus:joi.string().only(['accepted', 'rejected', 'acknowledged', 'pending'])
    });
    return schema.validate(complaint);}


    module.exports.Complaints=new mongoose.model("complaints", complaintSchema);
    module.exports.validateComplaint=validateComplaint;