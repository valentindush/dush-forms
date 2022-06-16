const jwt   = require('jsonwebtoken');
const { FormSchema } = require('../models/formsModel');
const { v4: uuidv4 } = require('uuid');
const { UsersSchema } = require('../models/userModel');
const { model } = require('mongoose');
const { ResultsSchema } = require('./resultsModel');

module.exports.CreateForm = async (req,res,next) => {
    try{


        const token = req.body.token;
        const form = req.body.form;

        if(!token){
            return res.status(402)

        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded){
            return res.status(401)
        }

        const user = await UsersSchema.findOne({email: decoded.email})
        if(!user){
            return res.status(401)
        }

        //Generate the form url

        const formURL = uuidv4();

        const newForm = FormSchema({
            url:formURL,
            owner: user._id,
            form: form
        })
        
        if(await newForm.save()){
            return res.json({status:true,url: newForm.url})
        }else{
            return res.status(500)
        }
    
    }catch(e){
        next(e)
    }
}

module.exports.getForm = async (req,res,next)=>{

    try {

        const token = req.body.token;
        const url = req.body.url;

        if(!token){
            return res.status(402)
        }

        if(!url){
            return res.status(403)
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if(!decoded){
            return res.status(401)
        }

        const form = await FormSchema.findOne({url:url})

        if(!form){
            return res.status(404)
        }

        return res.json({status:true,form:form.form})
        
    } catch (e) {
        next(e)
    }
}

model.exports.submitForm = async (req,res,next)=>{
    try {
        
        const token = req.body.token;
        const url = req.body.url;
        const results = req.body.results;
            
        if(!token){
            return res.status(402)
        }

        if(!url){
            return res.status(403)
        }

        if(!results){
            return res.status(403)
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await UsersSchema.findOne({email: decoded.email})
        if(!decoded){
            return res.status(401)
        }

        const newResult = ResultsSchema({
            formUrl: url,
            user: user._id,
            results: results
        })

        if(await newResult.save()){
            return res.json({status:true, msg: "Saved"})
        }else{

            return res.status(500)
        }




    } catch (e) {
        next(e)
    }
}

module.exports.deleteForm = async (req,res,next)=>{
    try {

        const token = req.body.token;
        const url = req.body.url;

        if(!token){
            return res.status(402)
        }

        if(!url){
            return res.status(403)
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded){
            return res.status(401)
        }

        const delete_form = await FormSchema.deleteOne({url:url})
        
        if(delete_form){
            return res.json({status:true, msg: "Deleted"})
        }else{
            return res.status(500)
        }
    } catch (err) {
        next(err)
    }
}