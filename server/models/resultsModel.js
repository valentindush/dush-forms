const mongoose = require('mongoose')
const ResultsSchema = new mongoose.Schema({
    formUrl: {
        type: String,
        required:true
    },
    user: {
        type:String, 
        required:true
    },
    results: {
        type: Object,
        required: true
    }
})

module.exports.ResultsSchema  = mongoose.model('results',ResultsSchema)