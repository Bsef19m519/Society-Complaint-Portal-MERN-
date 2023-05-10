const mongoose = require("mongoose");
const Joi = require('joi');

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
        default:'pending',
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
    const schema = Joi.object({
        complainerId: Joi.objectId().required(),
        complaintType: Joi.string().required(),
        description: Joi.string().min(10).max(100).required(),
        complaintStatus:Joi.string(),
        generationDate:Joi.date(),
        acknowledgeDate:Joi.date(),
        finalizeDate:Joi.date()
    });
    return schema.validate(complaint);}


    module.exports.Complaint=new mongoose.model("complaints", complaintSchema);
    module.exports.validateComplaint=validateComplaint;