const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  owner: { type: String, required: true },
  form: {
    type: Object,
    required: true,
  },
});

module.exports.FormSchema = mongoose.model("forms", FormSchema);
