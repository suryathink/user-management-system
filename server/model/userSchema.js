const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
},{
  timestamps:true,
  versionKey:false
});

const User = mongoose.model("user", Schema);

module.exports = User;
