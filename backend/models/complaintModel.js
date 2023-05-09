const mongoose = require("mongoose");
const joi = require('joi');

//Schema for Complaints 
const complaintSchema = mongoose.Schema({
    complainerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'resident',
        required:true
    },
    complaintType:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    generationDate:{
        type: Date,
        default: Date.now,
        required:true
    },
    complaintStatus :{
        type:String,
        enum:['resolved', 'rejected', 'acknowledged', 'pending']
    },
    acknowledgeDate:{
        type: Date,
        required:  function()
        {
            if (this.complaintStatus=="resolved" 
                || this.complaintStatus=="rejected"
                || this.complaintStatus=="acknowledged")
            {
                return true
            }
        }         
    },

    finalizeDate:
    {
        type: Date,
        required:  function( )
        {
            if (this.complaintStatus=="resolved"
                ||this.complaintStatus=="rejected")
            {
                return true
            }
        }
    }
})



function validateComplaint(complaint){
    const schema = joi.object({
        complainerId: joi.string().required(),
        complaintType: joi.string().required(),
        description: joi.string().min(10).max(100).required(),
        complaintStatus:joi.string(),
        generationDate:joi.date(),
        acknowledgeDate:joi.date(),
        finalizeDate:joi.date()
    });
    return schema.validate(complaint);}


    module.exports.Complaint=new mongoose.model("complaints", complaintSchema);
    module.exports.validateComplaint=validateComplaint;