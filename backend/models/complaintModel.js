const mongoose = require("mongoose");
const Joi = require('joi');

//Schema for Complaints 
const complaintSchema = mongoose.Schema({
    complainer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
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
        maxLength: 1000
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
        complaintType: Joi.string().required(),
        description: Joi.string().min(10).max(1000).required(),
    });
    return schema.validate(complaint);}


    module.exports.Complaint=new mongoose.model("complaints", complaintSchema);
    module.exports.validateComplaint=validateComplaint;