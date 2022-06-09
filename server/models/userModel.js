const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    username: {type: String, max:20, min:4,required:true},
    email: {type:String, required:true},
    password: {type: String, min: 7, max: 20 ,required: true},
})

module.exports.UsersSchema  = mongoose.model('users',UsersSchema)