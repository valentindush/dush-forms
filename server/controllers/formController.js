const jwt   = require('jsonwebtoken');
const { FormSchema } = require('../models/formsModel');
const { v4: uuidv4 } = require('uuid');
const { UsersSchema } = require('../models/userModel');

module.exports.CreateForm = async (req,res,next) => {
    try{


        const token = req.body.token;
        const form = req.body.form;

        console.log(form)

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
            owner: decoded._id,
            form: form
        })
    
    }catch(e){
        next(e)
    }
}