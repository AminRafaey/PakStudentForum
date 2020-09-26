const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");
const config = require("config");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 5,
    max: 40,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },

  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
  },

  type: {
    type: String,
    enum: ["Admin", "Learner"],
    default: "Learner",
  },

  verified:{
    type:Date,
    default: ""
  }
});

schema.methods.generateAuthToken = function (_id,name,userName) {
  return jwt.sign(
    { _id: _id, email: this.email, name:name, userName:userName, type: this.type },
    config.get("jwtPrivateKey")
  );
};

function validateUser(user) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().trim().strict().min(4).max(30).required(),
    verified: Joi.optional()
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", schema);
exports.User = User;
exports.validateUser = validateUser;
