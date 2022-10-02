
//I used the primary ways of node js in this project and i ain't gonna change 'em

const jwt = require("jsonwebtoken");
const { FormSchema } = require("../models/formsModel");
const { v4: uuidv4 } = require("uuid");
const { UsersSchema } = require("../models/userModel");
const { model, default: mongoose } = require("mongoose");
const { ResultsSchema } = require("../models/resultsModel");

module.exports.CreateForm = async (req, res, next) => {
  try {
    const token = req.body.token;
    const form = req.body.form;

    if (!token) {
      return res.status(402);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401);
    }

    const user = await UsersSchema.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401);
    }

    //Generate the form url

    const formURL = uuidv4();

    const newForm = FormSchema({
      url: formURL,
      owner: user._id,
      form: form,
    });

    if (await newForm.save()) {
      return res.json({ status: true, url: newForm.url });
    } else {
      return res.status(500);
    }
  } catch (e) {
    next(e);
  }
};

module.exports.getForm = async (req, res, next) => {
  try {
    const token = req.body.token;
    const url = req.body.url;

    if (!token) {
      return res.status(402);
    }

    if (!url) {
      return res.status(403);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401);
    }

    const form = await FormSchema.find({ url: url });

    if (!form) {
      return res.status(404);
    }

    return res.json({ status: true, form: form });
  } catch (e) {
    next(e);
  }
};

module.exports.submitForm = async (req, res, next) => {
  try {
    const token = req.body.token;
    const url = req.body.url;
    const results = req.body.results;

    if (!token) {
      return res.status(402);
    }

    if (!url) {
      return res.status(403);
    }

    if (!results) {
      return res.status(403);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await UsersSchema.findOne({ email: decoded.email });
    if (!decoded) {
      return res.status(401);
    }

    const newResult = ResultsSchema({
      formUrl: url,
      user: user._id,
      results: results,
    });

    try {
      await newResult.save();
    } catch (err) {
      return res.status(500);
    }
  } catch (e) {
    next(e);
  }
};

module.exports.getRecentForms = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!token) return res.status(402);
    if (!decoded) {
      return res.status(401);
    }

    const user = await UsersSchema.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401);
    }

    //Get all forms

    const forms = await FormSchema.find({ owner: user._id }).limit(15).sort({_id: -1});
    return res.json({ status: true, forms: forms });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteForm = async (req, res, next) => {
  try {
    const token = req.body.token;
    const url = req.body.url;

    if (!token) {
      return res.status(402);
    }

    if (!url) {
      return res.status(403);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401);
    }

    const delete_form = await FormSchema.deleteOne({ url: url });

    if (delete_form) {
      return res.json({ status: true, msg: "Deleted" });
    } else {
      return res.status(500);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.Submitresults = async (req, res, next) => {
  try {
    const { token, url, results } = req.body;
    if (!token || !url || !results) {
      return res.status(402).json({ status: false, msg: "Missing fields" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) return res.status(401).json({ status: false, msg: "Invalid Token" });

    const user = await UsersSchema.findOne({ email: decoded.email });
    if (!user) return res.status(401).json({ status: false, msg: "User not found" });

    const form = await FormSchema.findOne({ url: url });
    if (!form) return res.status(404).json({ status: false, msg: "Form not found" });

    //Check if the user had already submitted the form

    const result = await ResultsSchema.findOne({
      formUrl: url,
      user: user._id,
    });

    if (result) {
      return res
        .status(403)
        .json({ status: false, msg: "You have already submitted this form before." });
    }

    //Save the result

    const newResult = ResultsSchema({
      formUrl: url,
      user: user._id,
      results: results,
    });

    try {
      await newResult.save();
      return res.json({ status: true, msg: "Submitted" });
    } catch (err) {
      return res.status(500).json({ status: false, msg: "Error" });
    }
  } catch (err) {
    next(err);
  }
};


module.exports.getAnalytics = async(req,res,next)=>{
  try {

    /*

      Analytics

      -People who submitted 
      -their responses
      -If there are any multiple choices or checkboxes the I'll give percentages and numbers


    */

    //Verify is the request is from the owner of the form

    const {token, form} = req.body

    if(!token || !form) return res.status(402).json({msg: "bad request"})

    //Vefify token

    const decoded = jwt.verify(token, process.env.JWT_KEY)

    if(!decoded) return res.status(403)

    //Finde the user

    const user = UsersSchema.findOne({email: decoded.email})
    if(!user) return res.status(404)

    // check if the form exists

    const form_1 = FormSchema.findOne({owner: user._id})

    if(!form_1) return res.status(404).json({msg: "form not found"})

    //Find all results submitted to that form

    const allResults = ResultsSchema.find({url: form_1.url})
    
    
  } catch (err) {
    next(err)
  }
}