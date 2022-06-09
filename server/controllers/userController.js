const { UsersSchema } = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { SendVerificationCode } = require("../utils");
require('dotenv').config()


module.exports.register = async (req,res,next)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide all required fields"
        })
    }else if(username === "" || email === "" || password === ""){
        return res.status(400).json({message: "Please provide all required fields"})
    }else if(username.length < 4 || username.length > 20){
        return res.status(400).json({message: "Username must not contain special characters and must be between 4 an 20 characters"})
    }else if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        return res.status(400).json({message: "Invalid email address"})
    }else if(password.length <8 || password.length > 20){
        return res.status(400).json({message: "Password must be at least 8 characters and not more than 20"})
    }else{

        const isEmailTaken = await UsersSchema.findOne({email: email})
        if(isEmailTaken) return res.json({message: "Email is already taken"})

        const isUsernameTaken = await UsersSchema.findOne({username: username})
        if(isUsernameTaken) return res.json({message: "Username is  already taken"})

        const newPasword = await bcrypt.hash(password,10)

        let newUser = await UsersSchema.create({
            username: username,
            email: email,
            password: newPasword
        })

        if(await newUser.save()){
            const accessToken =  jwt.sign({email: email, username: username},process.env.JWT_KEY,{expiresIn: '1d'})

            console.log("done")
            
            return res.json({token: accessToken, status: true})

        }else{
            return res.status(500).json({message: "db error", status: false})
        }

    }
}


module.exports.login_home = async (req,res,next)=>{
    try{

        const token = req.body.token
        const jwtData = jwt.verify(token, process.env.JWT_KEY)

        if(jwtData){

            const user  = await UsersSchema.findOne({email: jwtData.email})
            if(user){
                return  res.status(200).json({msg: "true", code: 200, status: true})
            }else{
                return  res.status(402).json({msg: 'auth failed', code: 403, status: false})
            }

        }else {
            return res.status(403).json({msg: 'BAD REQ',code: 403, status: false})
        }


    }catch (e) {
        next(e)
    }
}

module.exports.login = async (req,res,next)=>{

    try {

        const email = req.body.email
        const password = req.body.password

        const user = await UsersSchema.findOne({email: email})
        if(!user) return res.json({msg:"Incorrect username or password", status: false})
        if(await bcrypt.compare(password,user.password)){

            const accessToken = jwt.sign({email: email, username: user.username,fullname: user.fullname}, process.env.JWT_KEY, {expiresIn: '1d'})

            return res.json({status: true, token: accessToken})

            
        }else{
            return res.json({msg: "Incorrect username or password", status: false})
        }
        
    } catch (err) {
        next(err)
    }
}

module.exports.verifyAccount = async (req,res,next)=>{

    try {

        const code = req.body.code
        const uuid = req.body.uuid
        const user = await UsersSchema.findById(uuid)

        if(user){

            if(user.verificationCode == code){
                const updateUser = await UsersSchema.updateOne({_id: user._id},{$set:{verified:true}})
                if(updateUser){
                    return res.json({msg: "verified", status: false})
                }
            }else{
                return req.json({msg: "Account verification failed", status: false})
            }
        }
        
    } catch (err) {
        
        next(err)
    }
}

