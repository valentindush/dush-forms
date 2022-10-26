const jwt = require('jsonwebtoken');
const { FormSchema } = require('../models/formsModel');
const { ResultsSchema } = require('../models/resultsModel');
module.exports.getResults = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const url = req.params.url;
        //Validate token
        if(!token || !url)return res.status(402)
        let decoded;
        try {
            decoded = jwt.verify(token,process.env.JWT_KEY);
        } catch (err) {
            return res.status(403).json({msg:"Invalid token"})
        }
        if(!decoded){
            return res.status(401).json({
                message:"Auth failed"
            });
        }
        //Get results

        try {
            //Check if the user is the owner of the form
            const forms = await FormSchema.findOne({url:url,owner:decoded.id})
            if(!forms) return res.status(404).json({msg: "Not found"})
            const allResults = await ResultsSchema.find({formUrl:url})
            return res.json({status:true,results:allResults})

        } catch (err) {
            return res.status(500).json({msg: "Something went wrong on our end"});
        }
        
    } catch (err) {
        next(err)
    }
}
