const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
  },

  statement: {
    type: String,
    required: true,
    min: 5,
    max: 600,
    unique: true,
  },

  options: {
    a: { type: String, min: 1, max: 300, required: true },
    b: { type: String, min: 1, max: 300, required: true },
    c: { type: String, min: 1, max: 300 },
    d: { type: String, min: 1, max: 300 },
    correct: { type: String, enum: ["a", "b", "c", "d"], required: true },
  },

  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory"
    },
  ],

  status: {
    type: String,
    enum: ["Active", "Suggestion"],
    default: "Active",
  },

  date: {
    type: Date,
    default: new Date(),
  },

  numOfShares:{
    type:Number,
    default:0
  }
});

schema.index({subCategories:1})

function validateMcq(mcq) {
  const schema = {
    statement: Joi.string().min(10).max(600).required(),
    options: Joi.object()
      .keys({
        a: Joi.string().min(1).max(300).required(),
        b: Joi.string().min(1).max(300).required(),
        c: Joi.string().min(1).max(300),
        d: Joi.string().min(1).max(300),
        correct: Joi.string().valid("a", "b", "c", "d").required(),
      })
      .required(),
    subCategories: Joi.array().items(Joi.objectId().required()),
  };
  return Joi.validate(mcq, schema);
}

function validateSuggestion(mcq) {
  const schema = {
    learnerId: Joi.objectId().required(),
    statement: Joi.string().min(10).max(600).required(),
    options: Joi.object()
      .keys({
        a: Joi.string().min(1).max(300).required(),
        b: Joi.string().min(1).max(300).required(),
        c: Joi.string().min(1).max(300),
        d: Joi.string().min(1).max(300),
        correct: Joi.string().valid("a", "b", "c", "d").required(),
      })
      .required(),
    status: Joi.string().valid("Suggestion").required(),
  };
  return Joi.validate(mcq, schema);
}

const Mcq = mongoose.model("Mcq", schema);
exports.Mcq = Mcq;
exports.validateMcq = validateMcq;
exports.validateSuggestion = validateSuggestion;
