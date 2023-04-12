const express = require('express');
const joi = require('joi');
const router = express.Router();

//dealing with get requests
router.get('/', (req,res)=>{
    res.send('hello world');
})
router.get('/admins', (req,res)=>{
    res.send({name: 'Ali', email: 'ali@ali.com', password: '34343434'});
})
router.get('/admins/:email', (req,res)=>{
    res.send(req.params.email);
})

    //dealing with post requests
router.post('/admins', (req,res)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        phone: joi.number().required()
    });
    const result = schema.validate(req.body);
    if(!result.error)
        res.send("ok");
    else{
        console.log(result.error);
        res.status(400).send(result.error.message);
    }
});
module.exports=router;
    